;(function() {
    //定义全局方法
    var initTable,
    	ajaxData,
        initColumns,
        closure,
        carBrand,
        carMake,
        carType,
        QXData,
        check,
        changCon, //那四个条件是否改变过
        initDate,  //申请日期的初始化
        maxDate, //数据截止日
        filterEmp, //过滤首尾空格,html
        show_more, //显示更多;
        initMethod, //元素触发事件及调用方法
        noConTable, //无条件表格
        initSel, //加载所有的下拉
        ajaxSel, //下拉框的处理
        areaLink, //区域联动
        areaInit, //区域联动初始化
        carLink, //车联动
        carLinkFn,
        isEncypt = [],
        renderA, //联动的改变
        programLink, //项目的联动
        filterCondition, //筛选条件区域
        search , //查询
        searchCon, //查询条件 
        reset, //select,input选项重置
        initTemplate, //初始化模板
        makeTemplate, //生成模板
        templateSH, //点击模板
        removeTemp, //删除模板
        defaultExportStu, //默认的导出状态
        fromHeadsel, //表头的多选
        isPower, //是否有导出权限
        isEmpty, //是否选择申请日期
        exportSelect; //导出选择
    var i=0;
    //加载表格 参数获取
    initMethod = function() {
    	$.createLoading();
    	filterEmp();
    	initSel(); // 初始化加载所有的下拉
    	initDate();
    	initTable(); //初始化表格
        $(document).delegate("#show_more_btn", "click", show_more);
        $("#contractChoice").siblings().hide();
        $("#selectTemplate>section:gt(0)").hide();
        filterCondition();
        makeTemplate();
        templateSH();
        removeTemp();
        search();
        reset();
        isPower();
        exportSelect();
        $(".sel_length,.selectpicker,.Wdate,.financing").on("change",function(){
        	$("#generationTemplate span").removeClass("light");
        });
        $("#myModalWarn").on("click","#konwE,#closeed",function(){
        	$("#myModalWarn").removeClass("in").css({display:"none"});
        });
        $("#exportBtn").on("click", function(){
        	$("#myExportModal").addClass("in").css({display:"block"});
        })
        $("#myExportModal").on("click","#exportBtnEnsure,#close",function(){
        	$("#myExportModal").removeClass("in").css({display:"none"});
        });
        $(".font_pos").each(function(){
        	var len = $(this).text().trim().length;
        	if(len<=7){
        		$(this).parent().css("line-height","28px");
        	}
        });
    };
    filterEmp = function () {
        var SCRIPT_REGEX = /\<.*?\>|'|(^\s*)|(\s*$)/gi;
        $("input,textarea").on("blur",function(){
            var text = $(this).val();
            if(SCRIPT_REGEX.test(text)){
                $(this).val(text.replace(SCRIPT_REGEX,""));
            }
        });
    };
    initDate = function(){
    	$("#selectTemplate section").hide();
    	$.createLoading();
    	if(maxDate){
    		$("#selectTemplate section").show();
    		$(".sel_det").html("");
    		$("#applyDS,#appDE").val(maxDate); 
    		$("#selectTemplate .sel_det").first().parent().show().siblings().hide();
    		$("#selectTemplate .sel_det").first().html('<span class="tit">申请日期</span><span>-</span><span>'+maxDate+'</span><span>至</span><span class="next">'+maxDate+'</span>');          	        		
    	}else{
    		$.ajax({
    			url:contextPath + '/entryDetails/getMaxMinDate.koala',
        		type:"get",
        		async:false,
        		dataType:"json",
        		success:function(data){
        			var date = data.data;
        			maxDate = date["applyDt"][0];
        			$("#selectTemplate section").show();
            		$("#applyDS,#appDE").val(maxDate); 
            		$("#selectTemplate .sel_det").first().html('<span class="tit">申请日期</span><span>-</span><span>'+maxDate+'</span><span>至</span><span class="next">'+maxDate+'</span>');          	    
            		$("#selectTemplate .sel_det").first().parent().show().siblings().hide();
            		$(".Wdate").each(function(){
    					var dCls = $(this).attr("data-class");
    					$(this).datetimepicker('setStartDate', date[dCls][1]);
    					$(this).datetimepicker('setEndDate', date[dCls][0]);
    				});
        		}
    		});
    	}
    }
    isEmpty = function(){
    	var strApplyDt = $("#applyDS").val().trim(), //申请日期
			endApplyDt = $("#appDE").val().trim();
    	if(!strApplyDt||!endApplyDt){
			var txt = $(".sel_det").text().trim();
			if(!filterEmp){
				$("#myModalWarn").addClass("in").css({display:"block"});
    			$("#myModalWarn").find(".content").html("申请日期的前后日期都要填写");
    			return false;
			}else{
				return true;
			}
		}else{
			return true;
		}
    };
    search = function(){
    	var baseUrl = contextPath,
    		pages = '';
    	$("#query").on("click",function(){
			if(isEmpty()){
				noConTable(pages);
			}	
    	});
    };
    reset = function(){
    	$("#reset").on("click",function(){
    		$.createLoading();
    		$("#pactDS,#pactDE,#cancelDS,#cancelDE").val("");
    		initDate();
        	ajaxSel();
    		areaLink();
    		carLink();
    		programLink();
    		$(".sel_length").val("");
    		$(".sqrq").val("");
    		$("#generationTemplate span").each(function(){
    			if($(this).hasClass("light")){
        			$(this).removeClass("light");
        		}
    		});
    		noConTable('');
    		$.closeLoading();
    	});
    };
    noConTable = function(pages){
    	$("#carType_table").delegate("#leapNum","keyup",function(e){
    		var e = e || window.event,
    			max = $("#pageAllN").text().trim()*1;
    		if(e.keyCode===13){
    		   var page = $(this).val().trim()*1;
    		   if(page>max){
	      		   page = 1;
	      	   }
	      	   pages = page;
	      	   $('#entry_table').bootstrapTable("selectPage",page);
	      	   $(".pagination li").each(function(){
	      		   var val = $(this).text().trim();
	      		   if(val===page){
	      			   $(this).addClass("active").siblings().removeClass("active");
	      		   }
	      	   });
    		}
         });
    	
    	var ext,
	    par = {};
		$(".sel_length").each(function(ind,item){	
			var key = $(this).attr("name"),
				val = $(this).val().trim();
			par[key]=val;
			if(val){
				ext = true;
			}
		});
		$("select").each(function(){
			var txt = $(this).next().find("button").attr("title"),
				id = $(this).attr("id"),
				name = $(this).attr("name").trim(),
				reg = /\,\s+/g;
			txt = txt.replace(reg,",")
			if(txt==="请选择"||txt==="不限"||txt==="无选择项"){
				txt="";
			}
			if(id==="finceLim"){
				var txtArr = txt.split(",");
				txtArr = txtArr.map(function(item,ind){
					item = item.substring(0,item.length-1);
					return item;
				});
				txt = txtArr.join(",");
			}
			if(id==='serviceType'){
				if(!txt){
					$("#"+id).find("option").each(function(){
		        		var t = $(this).text().trim();
		        		if(t!=="不限"){
		        			txt+=t+",";
		        		}
		        	});
					txt = txt.substring(0,txt.length-1);
				}
			}
			par[name]=txt;
			if(txt){
				ext = true;
			}
		});
		var entryDetails = JSON.stringify(par);
		var strApplyDt = $("#applyDS").val().trim(), //申请日期
			endApplyDt = $("#appDE").val().trim(),
			strEffDt = $("#pactDS").val().trim(), //合同生效日期
			endEffDt = $("#pactDE").val().trim(),
			strCancel = $("#cancelDS").val().trim(), //合同取消日期
			endCancel = $("#cancelDE").val().trim(),
			strfancAmt = $("#amountSt").val().trim(), //融资额
			endfancAmt = $("#amountEnd").val().trim();
		if(endfancAmt === "不限"){
			endfancAmt = "";
		}
		searchCon = {
				entryDetails:entryDetails,
				strApplyDt:strApplyDt,
				endApplyDt:endApplyDt,
				strEffDt:strEffDt,
				endEffDt:endEffDt,
				strCancel:strCancel,
				endCancel:endCancel,
				strfancAmt:strfancAmt,
				endfancAmt:endfancAmt
		};
        	
    	$("#entry_table").bootstrapTable('destroy');
    	$('#entry_table').bootstrapTable({
        	url: contextPath + '/entryDetails/queryEntryDetails.koala',
        	method:"post",
        	queryParams: function(){
        		return {  
        	        pageSize: this.pageSize,  
        	        pageNo: this.pageNumber,
        	        entryDetails:entryDetails,
        			strApplyDt:strApplyDt,
        			endApplyDt:endApplyDt,
        			strEffDt:strEffDt,
        			endEffDt:endEffDt,
        			strCancel:strCancel,
        			endCancel:endCancel,
        			strfancAmt:strfancAmt,
        			endfancAmt:endfancAmt
        	     };  
        	},
			contentType: "application/x-www-form-urlencoded",
			queryParamsType: "limit",
        	dataType: "json",
            locale:'zh-CN',//中文支持
            pagination: true,//是否开启分页（*）
            pageNumber:1,//初始化加载第一页，默认第一页
            sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
            pageSize: 10, //每页的记录行数（*）
            pageList: [ 10, 50, 100, 200, 300], //可供选择的每页的行数（*）
            columns: initColumns(),
            silent: true,  //刷新事件必须设置  
            undefinedText: '',
            formatLoadingMessage: function () {  
              return "请稍等，正在加载中...";  
            },  
            formatNoMatches: function () {  //没有匹配的结果  
              return '无符合条件的记录'; 
            },
            onLoadError: function (data) {  
                $('#reportTable').bootstrapTable('removeAll');  
            },
            onPageChange:function(e){
            	if(this.totalPages){
		        	   page = this.totalPages;
		        	   $(".pagination-info").html('共 <span id="pageAllN"> '+page+'</span> 页');
			    }
            	if($(".page-leap").length===0){
	            	$(".page-numbers").after('<span class="page-leap"> 跳至  <input type="text" class="leapNum" id="leapNum" value="'+pages+'"/>   页 </span>');				           
	            }
            	var num = this.pageNumber;
            	$(".pagination li").each(function(){
	        		   var val = $(this).text().trim();
	        		   if(val==num){
	        			   $(this).addClass("active");
	        		   }else{
	        			   $(this).removeClass("active");
	        		   }
	        	 });
            	 $(".page-numbers").after($(".page-list")[0]);
            },
            onPostBody:function(){
            	if($("#entry_table tbody").children().hasClass("no-records-found")){
	   				 $("#exportBtn").prop("disabled",true);
	   			}else{
	   				 $("#exportBtn").prop("disabled",false);
	   			}
	           	var that = this,
	           		len,
	           		page,
	           		size = this.pageSize,
	           	    length = this.totalPages,
	           		number = this.pageNumber;
		            $(".fixed-table-body tbody tr").each(function(){
		            	if(typeof $(this).attr("data-index")!=="undefined"){
		            		var txt = $(this).attr("data-index")*1;
		            		len = txt+1+(number-1)*size;
		            		$(this).children("td:eq(0)").text(len);
		            	}
		            });
		            if(length){
		        	   $(".pagination-info").html('共 <span id="pageAllN"> '+length+'</span> 页');
			        }
		            if($(".page-leap").length===0){
		            	$(".page-numbers").after('<span class="page-leap"> 跳至  <input type="text" class="leapNum" id="leapNum" value="'+pages+'"/>   页 </span>');				           
		            }
		            $(".pagination li").each(function(){
		        		   var val = $(this).text().trim();
		        		   if(val==number){
		        			   $(this).addClass("active");
		        		   }else{
		        			   $(this).removeClass("active");
		        		   }
		        	 });
		            $("#entry_table tbody tr").each(function(){
		            	if($(this).children().eq(9).text().trim()==="-"){
			            	$(this).children().eq(9).text("");
			            }
		            	if($(this).children().eq(10).text().trim()==="-"){
			            	$(this).children().eq(10).text("");
			            }
		            	if($(this).children().eq(11).text().trim()==="-"){
			            	$(this).children().eq(11).text("");
			            }
		            	if($(this).children().eq(12).text().trim()==="-"){
			            	$(this).children().eq(12).text("");
			            }
		            	var txt = $(this).children().eq(7).text().trim(),
		            		ind = txt.indexOf(".0");
		            	if(ind>=0){
		            		$(this).children().eq(7).text(txt.substring(0,ind));
		            	}
		            	var t = $(this).children().eq(9).text().trim(),
		            		index = t.indexOf(".0");
		            	if(index>=0){
		            		$(this).children().eq(9).text(t.substring(0,index));
		            	}
		            });
		            $(".page-numbers").after($(".page-list")[0]);
            }
		});
    };
    initTable = function() {
    	var pages = '',
    		pageN;
    	$("#startPg,#endPg").attr("disabled",true);
    	$("#startPg,#endPg").css("background","#f9f9f9");
        $("#entry_table").bootstrapTable('destroy');
        noConTable(pages);	
    };
   
    initColumns = function(){
    	 var arr = [ {
             field: '',
             title: '序号'
         }, {
             field: 'applyNo',
             title: '申请编号'
         }, {
             field: 'custName',
             title: '客户名称'
         },{
             field: 'certType',
             title: '证件类型'
         }, {
             field: 'applyType',
             title: '申请类型'
         }, {
             field: 'applySts',
             title: '申请状态'
         },{
             field: 'applyDt',
             title: '申请日期'
         }, {
             field: 'creteTime',
             title: '创建时间'
         }, {
             field: 'newCommitDt',
             title: '最新提交日期'
         },{
             field: 'contrEffectDt',
             title: '合同生效日期',
             undefinedText: ''
         },{
             field: 'contrCancelDt',
             title: '合同取消日期',
             undefinedText: ''
         },{
             field: 'serviceType',
             title: '业务类型'
         },{
             field: 'rentType',
             title: '租赁属性'
         }, {
             field: 'carType',
             title: '车辆类型'
         }, {
             field: 'regionName',
             title: '大区'
         }, {
             field: 'areaName',
             title: '片区'
         }, {
             field: 'branchCompany',
             title: '分公司</'
         }, {
             field: 'blngsComp',
             title: '所属公司'
         }, {
             field: 'cooperatChannel',
             title: '合作渠道一级科目'
         }, {
             field: 'customerChannelOne',
             title: '客户渠道一级科目'
         },{
             field: 'customerChannel',
             title: '客户渠道二级科目'
         }, {
             field: 'prjcType',
             title: '项目类型'
         }, {
             field: 'blngsPrjc',
             title: '所属项目'
         }, {
             field: 'quoteStoreCode',
             title: '店面代码'
         },{
             field: 'quoteStoreName',
             title: '店面名称'
         },{
             field: 'storeProvince',
             title: '店面省份'
         }, {
             field: 'applyPsnAccount',
             title: '提报人账号'
         }, {
             field: 'applyPsnName',
             title: '提报人名称'
         }, {
             field: 'carChnlName',
             title: '车辆渠道名称'
         }, {
             field: 'carInvoiceComp',
             title: '车辆开票单位'
         },{
             field: 'carEvaluateChnl',
             title: '二手车评估渠道'
         }, {
             field: 'aprvResult',
             title: '审批结果'
         }, {
             field: 'aprvRfsPsn',
             title: '审批拒绝人'
         }, {
             field: 'rfsJobs',
             title: '拒绝节点'
         },{
             field: 'aprvRfsRes',
             title: '审批拒绝原因'
         }, {
             field: 'aprvRmak',
             title: '审批备注'
         }, {
             field: 'productNo',
             title: '产品编号'
         }, {
             field: 'productName',
             title: '产品方案名称'
         },{
             field: 'discountIf',
             title: '是否贴息'
         }, {
             field: 'discountType',
             title: '贴息类型'
         }, {
             field: 'isRisk',
             title: '是否融保险'
         }, {
             field: 'isFinanceGps',
             title: 'GPS是否融资'
         },{
             field: 'financePeriod',
             title: '融资期限'
         }, {
             field: 'feePayMode',
             title: '手续费扣款方式'
         }, {
             field: 'financeAmt',
             title: '融资额'
         }, {
             field: 'insureBusinessAmt',
             title: '商业险融资金额'
         },{
             field: 'insureStrongAmt',
             title: '交强险融资金额'
         }, {
             field: 'vesselTaxAmt',
             title: '车船税融资金额'
         }, {
             field: 'insureWydqAmt',
             title: '无忧盗抢险金额'
         }, {
             field: 'carBillMoney',
             title: '车辆发票金额'
         }, {
             field: 'gpsPriceType',
             title: 'GPS价格类型'
         }, {
             field: 'applyWhnAge',
             title: '申请时年龄'
         }, {
             field: 'userGender',
             title: '申请人性别'
         }, {
             field: 'marryStatus',
             title: '婚姻状况'
         },{
             field: 'education',
             title: '学历'
         },  {
             field: 'unitBlngsIdstr',
             title: '单位所属行业'
         },{
             field: 'unitEntrpChrc',
             title: '单位企业性质'
         }, {
             field: 'psnOccu',
             title: '个人职业'
         }, {
             field: 'psnDuty',
             title: '个人职务'
         }, {
             field: 'unitProvince',
             title: '单位所在省份'
         },{
             field: 'unitCity',
             title: '单位所在城市'
         }, {
             field: 'raddProvince',
             title: '现居住地省份'
         }, {
             field: 'raddCity',
             title: '现居住地城市'
         }, {
             field: 'vinNo',
             title: '车架号'
         },{
             field: 'carCode',
             title: '车牌号码'
         }, {
             field: 'carMotorNo',
             title: '发动机号'
         }, {
             field: 'brand',
             title: '品牌'
         }, {
             field: 'manufacId',
             title: '车辆制造商'
         }, {
             field: 'carseries',
             title: '车系'
         },{
             field: 'models',
             title: '车型'
         }, {
             field: 'specModels',
             title: '特殊车型'
         }, {
             field: 'prdcMode',
             title: '生产方式'
         }, {
             field: 'gpsNum1',
             title: 'GPS卡号1'
         },{
             field: 'gpsNum2',
             title: 'GPS卡号2'
         }, {
             field: 'gpsPrice',
             title: 'gps总价'
         },{
             field: 'gpsBasePrice',
             title: 'gps基础价'
         }, {
             field: 'gpsMarkup',
             title: 'gps加价'
         } ]
    	 var len = isEncypt.length;
    	 if(len){
    		 if(!isEncypt[0]){
      			arr.splice(3,0, {
                     field: 'custMobile',
                     title: '客户手机号'
                 });
      			 arr.splice(5,0, {
                      field: 'certTypeNo',
                      title: '证件号码'
                  });
      			 arr.splice(57,0,{
	                     field: 'aftaxYsalary',
	                     title: '税后年薪'
	                 }, {
	                     field: 'othIncome',
	                     title: '其他税后年收入'
	                 });
    		 }
    	 }else{
    		 $.ajax({
           	 	 url:contextPath+"/entryDetails/isEncypt.koala",
             	 type:"get",
             	 async:false,
             	 dataType:"json",
             	 success:function(data){
             		isEncypt = [];
             		isEncypt.push(data.data);
             		 if(!data.data){
             			arr.splice(3,0, {
                            field: 'custMobile',
                            title: '客户手机号'
                        });
             			 arr.splice(5,0, {
                             field: 'certTypeNo',
                             title: '证件号码'
                         });
             			 arr.splice(57,0,{
    	                     field: 'aftaxYsalary',
    	                     title: '税后年薪'
    	                 }, {
    	                     field: 'othIncome',
    	                     title: '其他税后年收入'
    	                 });
             		 }
             	 }
             });
    	 }
       return arr;
    };
    show_more = function() {
        var con = Number($(this).attr('data-rel'));
        if (con === 1) {
            $("#hidden_div").show();
            $("#show_more_btn").attr('data-rel', 2);
            $("#show_more_btn").text("收起");
            $("#contractChoice").siblings().show();
            $("#show_more_img").attr("src", contextPath+"/pages/carCustomerPortrait/img/up.png");
        } else {
            $("#hidden_div").hide();
            $("#show_more_btn").attr('data-rel', 1);
            $("#show_more_btn").text("更多");
            $("#contractChoice").siblings().hide();
            $("#show_more_img").attr("src", contextPath+"/pages/carCustomerPortrait/img/down.png");
        }
    };
    initSel = function() {
    	$('.selectpicker').selectpicker({
    		actionsBox:true,
    		deselectAllText:"取消",
    		selectAllText:"全选"
    	});
    	$(".selectpicker").each(function(){
    		var lab = $(this).prev().text().trim();
    		if(lab){
    			$(this).next().find(".bs-searchbox").find(".form-control").attr("placeholder","请输入"+lab);
    		}
    	});
    	$(".Wdate").datetimepicker({
			language:  'zh-CN', 
 		    minView: "month",
 		    autoclose: true
 		 }).on('outOfRange', function(ev){
 			 var startDate = ev.startDate,
 			     endDate = ev.endDate;
 			$(".datetimepicker").hide();
 			$("#myModalWarn").addClass("in").css({display:"block"});
			$("#myModalWarn").find(".content").html("所选日期应在"+startDate.getFullYear()+"-"+(startDate.getMonth()+1)+"-"+startDate.getDate()+"至"+endDate.getFullYear()+"-"+(endDate.getMonth()+1)+"-"+endDate.getDate()+"之内");
    	});
    	$(".row").on("click",".btn-group",function(){
			if($(this).hasClass("open")){
				$(this).removeClass("open");
			}else{
				$(this).addClass("open");
			}
		});
		$("#entry_details_bottom").on("click",".page-list .btn-group",function(){
			if($(this).hasClass("open")){
				$(this).removeClass("open");
			}else{
				$(this).addClass("open");
			}
		});
		var applyDS = $("#applyDS").val().trim(),
			appDE = $("#appDE").val().trim();
		$("#selectTemplate .sel_det").first().html('<span class="tit">申请日期</span><span>-</span><span>'+applyDS+'</span><span>至</span><span class="next">'+appDE+'</span>');
		ajaxSel();
		areaLink();
		carLink();
		programLink();
        
    };
    areaLink = function(){
    	var baseUrl = contextPath;
    	$.ajax({
    		url:baseUrl + '/entryDetails/getAreas.koala',
    		type:"get",
    		async:false,
    		dataType:"json",
    		success:function(data){
    			if(data.data.length < 1){
					return false;
				}
    			var data = data.data.data,
    				belong = $("#belong"), //所属公司
    				region = $("#region"), //大区
    				belongDepartment = $("#belong_department"), //片区
    				subCompany = $("#sub_company"), //分公司
    				belongJson = data['compny'],
    				regionJson = data['area'],
    				departmentJson = data['area'],
    				subJson = data['area'],
    				belongDom = '<option value="" class="">不限</option>',
    				regionDom = '<option value="" class="">不限</option>',
    				departmentDom = '<option value="" class="">不限</option>',
    				subDom = '<option value="" class="">不限</option>';
    			areaInit(belong,belongJson,belongDom); //所属公司
    			areaInit(region,regionJson,regionDom); //大区
    			areaInit(belongDepartment,departmentJson,departmentDom); //片区
    			areaInit(subCompany,subJson,subDom); //分公司
    			region.change(function(){
    				var val = $(this).find("option:selected").attr("value"),
    					subArr = [],
    					pattA = [];
    				departmentDom = '<option value="" class="">不限</option>';
    				subDom = '<option value="" class="">不限</option>';
    				if(val){
    					if(departmentJson){
        					$.each(departmentJson,function(ind,item){
            					if(item[0]==val&&pattA.indexOf(item[1])<0&&item[1]){
            						pattA.push(item[1]);
            						departmentDom+='<option value="'+item[0]+'" class="" data-id="'+item[0]+'">'+item[1]+'</option>'
            					}
            				});
        				} 		
        				if(subJson){
        					$.each(subJson,function(ind,item){
            					if(item[0]==val&&item[2]){
            						subArr.push(item[2]);
            						subDom+='<option value="'+item[1]+'" class="" data-id="'+item[0]+'">'+item[2]+'</option>'
            					}
            				});
        				}
    				}else{
    					if(departmentJson){
        					$.each(departmentJson,function(ind,item){
        						if(pattA.indexOf(item[1])<0&&item[1]){
        							pattA.push(item[1]);
        							departmentDom+='<option value="'+item[0]+'" class="" data-id="'+item[0]+'">'+item[1]+'</option>'
        						}
            				});
        				} 		
        				if(subJson){
        					$.each(subJson,function(ind,item){
            					if(item[2]){
            						subArr.push(item[2]);
            						subDom+='<option value="'+item[1]+'" class="" data-id="'+item[0]+'">'+item[2]+'</option>'
            					}
            				});
        				}
    				}
    				
    				/*片区*/
        			belongDepartment.selectpicker();
    				belongDepartment.empty().html(departmentDom);
    				belongDepartment.selectpicker('render');
    				belongDepartment.selectpicker('refresh');
    				subCompany.selectpicker();
    				subCompany.empty().html(subDom);
    				subCompany.selectpicker('render');
    				subCompany.selectpicker('refresh');
    				subCompany.find("option").each(function(){
    	        		var val = $(this).val().trim(),
    	        			t = $(this).text().trim(),
    	        			num = 0;
    	        		if(!val){
    	        			$.each(subArr, function(ind,item){
    	        				if(item===t){
    	        					num++;
    	        				}
    	        			});
    	        			if(num>1){
    	        				$(this).remove();
    	        			}
    	        		}
    	        	});
    				subCompany.selectpicker('refresh');
    			});
    			belongDepartment.change(function(){
    				var belVal = belong.find("option:selected").text().trim(),
    					regionVal = region.find("option:selected").text().trim(),
    					regionV = region.find("option:selected").val(),
    					val = $(this).find("option:selected").text().trim(),
    					value = $(this).find("option:selected").val(),
    					partArr = [],
    					pattA = [];
    				subDom = '<option value="" class="">不限</option>';
    					region.find("option").each(function(){
        	        		var values = $(this).attr('value');
        	        		if(values===value){
        	        			$(this).prop("selected",true);
        	        			region.selectpicker('refresh');
        	        			departmentDom = '<option value="" class="">不限</option>';
        	        	    	$.each(departmentJson,function(ind,item){
    	        	    			if(item[0]===values&&pattA.indexOf(item[1])<0&&item[1]){
    	        	    				pattA.push(item[1]);
    	        	    				departmentDom+='<option value="'+item[0]+'" class="" data-id="'+item[0]+'">'+item[1]+'</option>'
    	        	        		}
        	        	    	});
        	        	    	belongDepartment.selectpicker();
        	        	    	belongDepartment.empty().html(departmentDom);
        	        	    	belongDepartment.selectpicker('render');
        	        	    	belongDepartment.selectpicker('refresh');
        	        		}
        	        	});
    					belongDepartment.find("option").each(function(){
    						var t = $(this).text().trim();
    						if(val===t){
    							$(this).prop("selected",true);
    							belongDepartment.selectpicker('refresh');
    						}
    					});
    				if(subJson){
    					$.each(subJson,function(ind,item){ 
    						if(regionVal!=="不限"){
    							if(value){
    								if(item[0]===regionVal&&item[1]===val&&item[2]){
            							subDom+='<option value="'+item[1]+'" class="" data-id="'+item[0]+'">'+item[2]+'</option>'
            						}
    							}else{
    								if(item[0]===regionVal&&item[2]){
            							subDom+='<option value="'+item[1]+'" class="" data-id="'+item[0]+'">'+item[2]+'</option>'
            						}
    							}
        					}else{
        						if(value){
        							if(item[1]==val&&item[2]){
                						subDom+='<option value="'+item[1]+'" class="" data-id="'+item[0]+'">'+item[2]+'</option>'
                					}
        						}else{
        							if(item[2]){
                						subDom+='<option value="'+item[1]+'" class="" data-id="'+item[0]+'">'+item[2]+'</option>'
                					}
        						}
        					}
        					
        				}); 
    				}		
    				/*分公司*/
        			subCompany.selectpicker();
    				subCompany.empty().html(subDom);
    				subCompany.selectpicker('render');
    				subCompany.selectpicker('refresh');
    			});
    			subCompany.change(function(){
    				var val = $(this).find("option:selected").val(),
    				    regionV = region.find("option:selected").val(),
    				    belongV = belongDepartment.find("option:selected").val(),
    				    selT = $(this).find("option:selected").text().trim(),
    				    selV = $(this).find("option:selected").val().trim(),
    				    patArr = [],
    				    pattA = [],
					    id = $(this).find("option:selected").attr('data-id');
    					region.find("option").each(function(){
        	        		var values = $(this).text().trim();
        	        		if(values===id){
        	        			$(this).prop("selected",true);
        	        			region.selectpicker('refresh');
        	        			departmentDom = '';
        	        	    	$.each(departmentJson,function(ind,item){
    	        	    			if(item[0]===values&&pattA.indexOf(item[1])<0&&item[1]){
    	        	    				pattA.push(item[1]);
    	        	    				departmentDom+='<option value="'+item[0]+'" class="" data-id="'+item[0]+'">'+item[1]+'</option>'
    	        	        		}
        	        	    	});
        	        	    	belongDepartment.selectpicker();
        	        	    	belongDepartment.empty().html(departmentDom);
        	        	    	belongDepartment.selectpicker('render');
        	        	    	belongDepartment.selectpicker('refresh');
        	        		}
    					});
    					belongDepartment.find("option").each(function(){
    						var t = $(this).text().trim();
    						if(val===t){
    							$(this).prop("selected",true);
    							belongDepartment.selectpicker('refresh');
    						}
    					});
    					subDom = '';
	        	    	$.each(subJson,function(ind,item){
        	    			if(item[1]===val&&item[2]){
        	    				subDom+='<option value="'+item[1]+'" class="" data-id="'+item[0]+'">'+item[2]+'</option>'
        	        		}
	        	    	});
	        	    	subCompany.selectpicker();
	        	    	subCompany.empty().html(subDom);
	        	    	subCompany.selectpicker('render');
	        	    	subCompany.selectpicker('refresh');
	        	    	subCompany.find("option").each(function(){
							var t = $(this).text().trim(),
								v = $(this).val().trim();
							if(selT===t&&selV===v){
								$(this).prop("selected",true);
								subCompany.selectpicker('refresh');
							}
						});
    				if(!selV){
    					areaInit(subCompany,subJson,subDom); //分公司
    					subCompany.find("option").each(function(){
    						var t = $(this).text().trim(),
    							v = $(this).val().trim();
    						if(selT===t&&selV===v){
    							$(this).prop("selected",true);
    							subCompany.selectpicker('refresh');
    						}
    					});
    				}
    			});
    		}
    	});
    };
    areaInit = function(ele,json,dom){ 
    	var arr = [];
    	var id = ele.attr("id");
    	dom = "<option value=''>不限</option>";
    	if(json){
    		$.each(json,function(ind,item){
    			switch(id){
		    		case "belong":
		    			if(arr.indexOf(item)<0&&item){
		    				arr.push(item);
			    			dom+='<option value="'+item+'" class="" data-id="'+item+'">'+item+'</option>'
		    			}
		    		break;
		    		case "region":
		    			if(arr.indexOf(item[0])<0&&item[0]){
		    				arr.push(item[0]);
		    				dom+='<option value="'+item[0]+'" class="" data-id="'+item[0]+'">'+item[0]+'</option>'
		    			}
			    	break;
		    		case "belong_department":
		    			if(arr.indexOf(item[1])<0&&item[1]){
		    				arr.push(item[1]);
		    				dom+='<option value="'+item[0]+'" class="" data-id="'+item[0]+'">'+item[1]+'</option>'
		    			}
			    	break;
		    		case "sub_company":
		    			if(item[2]){
	    					arr.push(item[2]);
	    					dom+='<option value="'+item[1]+'" class="" data-id="'+item[0]+'">'+item[2]+'</option>'
		    			}
			    	break;
		    	}
    		});
    	}
		/*所属公司*/
		ele.selectpicker();
    	ele.empty().html(dom);
    	ele.selectpicker('render');
    	ele.selectpicker('refresh');
    	if(ele.text().trim() === "不限"){
    		ele.attr("disabled",true);
    		ele.next().find("button").css("background","#f9f9f9");
    		ele.next().find("button").addClass("disabled");
    	}else if(id === "sub_company"){
    		ele.find("option").each(function(){
        		var val = $(this).val().trim(),
        			t = $(this).text().trim(),
        			num = 0;
        		if(!val){
        			$.each(arr, function(ind,item){
        				if(item===t){
        					num++;
        				}
        			});
        			if(num>1){
        				$(this).remove();
        			}
        		}
        	});
    		ele.selectpicker('refresh');
    	}
    };
    carLinkFn = function(carBrand,carMake,carType){
    	var arr,
			brand = $('#brand'),
			make = $('#vehicle_manufacturer'),
			type = $('#car_models'),
			brandDom = "",
			carBrandDom = '<option value="" class="">不限</option>',
			carMakeDom = '<option value="" class="">不限</option>',
			carTypeDom = '<option value="" class="">不限</option>';
		
		$.each(carBrand,function(ind,item){
			carBrandDom+='<option value="'+item+'" class="" data-id="'+item+'">'+item+'</option>'
		});
		/*品牌*/
	    brand.selectpicker();
		brand.empty().html(carBrandDom);
		brand.selectpicker('render');
		brand.selectpicker('refresh');
		
	    $.each(carMake,function(ind,item){
	    	if(item[1]){
	    		carMakeDom+='<option value="'+item[0]+'" class="" data-id="'+item[0]+'">'+item[1]+'</option>'
	    	}
		});
	    /*车辆制造商*/
	    make.selectpicker();
	    make.empty().html(carMakeDom);
	    make.selectpicker('render');
	    make.selectpicker('refresh');
	    
	    /* 车型  */
	    type.selectpicker();
	    type.empty().html(carTypeDom);
	    type.attr("disabled",true);
	    type.next().find("button").css("background","#f9f9f9");
	    type.selectpicker('render');
	    type.selectpicker('refresh');
	    brand.change(function(){
	    	var value = brand.find("option:selected").val().trim();
	    	if(!value){
	    		carMakeDom = '<option value="" class="">不限</option>';
	    		$.each(carMake,function(ind,item){
	    			if(item[1]){
	    				carMakeDom+='<option value="'+item[0]+'" class="" data-id="'+item[0]+'">'+item[1]+'</option>'
	    			}
				});
		        /*车辆制造商*/
		        make.selectpicker();
		        make.empty().html(carMakeDom);
		        make.selectpicker('render');
		        make.selectpicker('refresh');
		        carTypeDom = '<option value="" class="">不限</option>';
	        	type.selectpicker();
		        type.empty().html(carTypeDom);
		        type.selectpicker('render');
		        type.selectpicker('refresh');
		        type.attr("disabled",true);
		        type.next().find("button").css("background","#f9f9f9");
		        
	    	}else{
	    		renderA($(this),make,carMake,carMakeDom);
	    		renderA($(this),type,carType,carTypeDom);
	    		type.attr("disabled",true);
		        type.next().find("button").css("background","#f9f9f9");
	    	}
	    	
	    });
	    make.change(function(){
	    	var id = $(this).find("option:selected").attr("data-id"),
	    		values = brand.find("option:selected").attr("value"),
	    		txt = $(this).find("option:selected").text(),
	    		st = $(this).text().trim();
	    	carTypeDom = "";
	    	if(values){
	    		type.attr("disabled",false);
	    		type.next().find("button").css("background","#fff");
	    	}
	    	type.next().css("border-radius","5px");
	    		brand.find("option").each(function(){
	        		var value = $(this).attr('value');
	        		if(value===id){
	        			$(this).prop("selected",true);
	        			brand.selectpicker('refresh');
	        			carMakeDom = '';
	        	    	$.each(carMake,function(ind,item){
	    	    			if(item[0]===id&&item[1]){
	    	    				carMakeDom+='<option value="'+item[0]+'" class="" data-id="'+item[0]+'">'+item[1]+'</option>'
	    	        		}
	        	    	});
	        	    	make.selectpicker();
	        	    	make.empty().html(carMakeDom);
	        	    	make.selectpicker('render');
	        	    	make.selectpicker('refresh');
	        		}
	        	});
	    		make.find("option").each(function(){
					var t = $(this).text();
					if(txt===t){
						$(this).prop("selected",true);
						make.selectpicker('refresh');
					}
				});
	        renderA($(this),type,carType,carTypeDom);
	
	    });
	};
    carLink = function(){
    	if(carBrand){
    		carLinkFn(carBrand,carMake,carType);
    	}else{
    		var baseUrl = contextPath;
        	$.ajax({
        		url:baseUrl + '/entryDetails/getModels.koala',
        		type:"get",
        		dataType:"json",
        		success:function(data){
        			if(data.data.length < 1){
    					return false;
    				}
        			var json = data.data;
        			carBrand = json['car_brand'];
        			carMake = json['car_make'];
        			carType = json['car_style'];
        			carLinkFn(carBrand,carMake,carType);
        		}
        	});
    	}
    };
    renderA = function(ele,nEle,data,dom){
    	var id = ele.find("option:selected").text().trim();
    	dom = '<option value="" class="">不限</option>';
    	$.each(data,function(ind,item){
    		if(item.length===2){
    			if(item[0]===id){
    				dom+='<option value="'+item[0]+'" class="" data-id="'+item[0]+'">'+item[1]+'</option>'
        		}
    		}
    	});
    	nEle.selectpicker();
    	nEle.empty().html(dom);
    	nEle.selectpicker('render');
    	nEle.selectpicker('refresh');
    	if(nEle.text().trim() === "不限"){
    		nEle.attr("disabled",true);
    		nEle.next().find("button").css("background","#f9f9f9");
    		nEle.next().find("button").addClass("disabled");
    	}else{
    		nEle.attr("disabled",false);
    		nEle.next().find("button").css("background","#fff");
    		nEle.next().find("button").removeClass("disabled");
    	}
    }
    programLink = function(){
    	var baseUrl = contextPath;
    	$.ajax({
    		url:baseUrl + '/entryDetails/getBlngsPrjc.koala',
    		type:"get",
    		dataType:"json",
    		success:function(data){
    			if(data.data.length < 1){
					return false;
				}
    			var data = data.data,
    				projectType = $("#project_type"),
    				belongProject = $("#belong_project"),
    				projectTypeDom = '<option value="" >不限</option>',
    				belongProjectDom = '',
    				typeJson = [];
    			$.each(data,function(ind,item){
    				if(typeJson.indexOf(item[0])<0){
    					typeJson.push(item[0]);
    				}
    				if(item[2]){
    					belongProjectDom+='<option value="" class="" data-id="'+item[0]+'">'+item[2]+'</option>';
    				}
    			});
    			$.each(typeJson,function(ind,item){
    				if(item){
    					projectTypeDom+='<option value="" class="" >'+item+'</option>'
    				}
    			});
    			 /*项目类型*/
    			projectType.empty().html(projectTypeDom);
		        $('.selectpicker').selectpicker();
		        projectType.selectpicker('render');
		        projectType.selectpicker('refresh');
    			/*所属项目*/
    			belongProject.empty().html(belongProjectDom);
		        $('.selectpicker').selectpicker();
		        belongProject.selectpicker('render');
		        belongProject.selectpicker('refresh');
		        belongProject.next().find(".filter-option").text("");
    			projectType.change(function(){
    				var val = $(this).find("option:selected").text().trim();
    				belongProjectDom = '';
    				$.each(data,function(ind,item){
    					if(item[2]){
    						if(val===item[0]){
            					belongProjectDom+='<option value="" class="" data-id="'+item[0]+'">'+item[2]+'</option>'
            				}else if(val==="不限"){
            					belongProjectDom+='<option value="" class="" data-id="'+item[0]+'">'+item[2]+'</option>'
            				}
    					}
        			});
        			belongProject.empty().html(belongProjectDom);
    		        $('.selectpicker').selectpicker();
    		        belongProject.selectpicker('render');
    		        belongProject.selectpicker('refresh');
    		        belongProject.next().find(".filter-option").text("");
    			});
    		}
    	});
    };
    ajaxSel = function(){
    	var baseUrl = contextPath;
    	$.ajax({
    		url:baseUrl + '/entryDetails/getInit.koala',
    		type:"get",
    		async:false,
    		dataType:"json",
    		success:function(data){
    			if(data.data.length < 1){
					return false;
				}
    			var data = data.data;
    			$(".mult").each(function(ind,item){
    				var id = $(this).attr("id"),
    					json;
    				if(id){
    					if(id==="IsFince"){
    						json = ['融保险','不融保险']
    					}else{
    						json = data[id];
    					}
    					var ele = $("#"+id);
    					if(ele.attr("multiple")){
    						var ajaxDom = "";
					    }else{
					    	var ajaxDom = "<option value=''>不限</option>";
					    }
    					if(id==='finceLim'){
    						json=json.sort(function(a,b){
    							return a-b;
    						});
    						$.each(json, function (ind,item) {
    							if(item){
    								ajaxDom+="<option value=''>" + item + "期</option>";
    							}
    			            });
    					}else{
    						$.each(json, function (ind,item) {
    							if(item){
    								ajaxDom+="<option value=''>" + item + "</option>";
    							}
    			            });
    					}
				        ele.empty().html(ajaxDom);
				        $('.selectpicker').selectpicker();
				        ele.selectpicker('render');
					    ele.selectpicker('refresh');
    				}
    				if($(this).attr("multiple")){
    					$(this).next().find(".filter-option").text("");
    				}
    			});
    		}
    	});
    };
    filterCondition = function(){
        $(".empty").change(function(){
        	filterEmp = true;
            $("#applyDS,#appDE").val("");
            var t = $(".sel_det").text().trim();
        	if(t.indexOf("申请日期")>=0){
        		$(".sel_det span").each(function(){
        			if($(this).text().trim()==="申请日期"){
        				if($(this).next().next().next().text().trim()==="至"){
        					if($(this).next().next().next().next().next().text().trim()==="，"){
        						$(this).next().next().next().next().next().remove();
        					}
        					$(this).next().remove();
            				$(this).next().remove();
            				$(this).next().remove();
            				$(this).next().remove();
            				$(this).remove();
        				}else{
        					if($(this).prev().text().trim()==="，"){
        						$(this).prev().remove();
        					}
        					$(this).next().remove();
            				$(this).next().remove();
            				$(this).remove();
        				}
        			}
        		});
        	}
        });
        $(".sel_length").change(function(){
            var title = $(this).parents(".row").siblings(".contract_title").text().trim(),
                selTitEle = $("#selectTemplate").find(".sel_tit"),
                tit = $(this).siblings("label").text().trim(),
                txt = $(this).val().trim(),
                len = txt.length;
            selTitEle.each(function(ind,item){
                if($(this).text().trim()===title){
                	$(this).parents("section").show();
                    var selTxt = $(this).next().text().trim(),
                        sel = $(this),
                        exit;
                    if(selTxt){
                            $(this).next().find(".tit").each(function(){
                                if($(this).text().trim()===tit){
                                    exit = true;
                                    if(txt){
                                    	if(len>16){
                                        	tit = txt.substr(0,16);
                                            $(this).next().next().text(tit+'...');
                                        }else{
                                            $(this).next().next().text(txt);
                                        }
                                    }else{
                                    	if($(this).prev().text().trim().length===0){
                                    		$(this).next().next().next().remove();
                                    	}
                                    	if($(this).prev().text().trim()==="，"){
                                    		$(this).prev().remove();
                                    	}
                                    	
                                    	$(this).next().next().remove();
                                    	$(this).next().remove();
                                    	$(this).remove();
                                    	if(!sel.next().text().trim()){
                                    		sel.parents("section").hide();
                                    	}
                                    }
                                }
                            });
                            if(!exit){
                            	txt = txt.substr(0,16);
                                if(len>16){
                                    $(this).next().append('<span>，</span><span class="tit">'+tit+'</span><span>-</span><span>'+txt+'...</span>')
                                }else{
                                    $(this).next().append('<span>，</span><span class="tit">'+tit+'</span><span>-</span><span>'+txt+'</span>');
                                }
                            }
                    }else{
                        if(len>16){
                        	txt = txt.substr(0,16);
                            $(this).next().append('<span class="tit">'+tit+'</span><span>-</span><span>'+txt+'...</span>')
                        }else{
                            $(this).next().append('<span class="tit">'+tit+'</span><span>-</span><span>'+txt+'</span>');
                        }
                    }
                }
            });
        });
        $(".financing").on('keyup', function (event) {
            var $amountInput = $(this);
            //响应鼠标事件，允许左右方向键移动 
            event = window.event || event;
            if (event.keyCode == 37 || event.keyCode == 39) {
                return;
            }
            var t = $(this).val().trim(),
            	reg = /^[0][0-9]/g;
            if(t.indexOf(".")<0&&reg.test(t)){
            	$amountInput.val($amountInput.val().replace(/^[0]+/,""));
            }
            //先把非数字的都替换掉，除了数字和. 
            $amountInput.val($amountInput.val().replace(/[^\d.]/g, "").
                //只允许一个小数点              
                replace(/^\./g, "").replace(/\.{2,}/g, ".").
                //只能输入小数点后两位
                replace(".", "$#$").replace(/\./g, "").replace("$#$", ".").replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
        });
        $(".financing").on('blur', function () {
            var $amountInput = $(this);
            //最后一位是小数点的话，移除
            $amountInput.val(($amountInput.val().replace(/\.$/g, "")));
        });
        $(".Wdate,.financing").on("change",function(){
        	var title = $(this).parents(".row").siblings(".contract_title").text().trim(),
            selTitEle = $("#selectTemplate").find(".sel_tit"),
            tit = $(this).siblings("label").text().trim(),
            selTxt = $(this).next().text().trim(),
            txt = $(this).val().trim(),
            self_ = $(this),
            reg = /^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
            id = $(this).attr("data-id"),
            dataE;
        	if($(this).hasClass("financing")){
        		if(isNaN(txt*1)||txt*1<0.00||txt*1>999999.99){
        			$("#myModalWarn").addClass("in").css({display:"block"});
        			$("#myModalWarn").find(".content").html("融资额必须是0.00-999999.99的数字");
        			$(this).val("");
        			return false;
        		}else{
        			if(txt){
        				if(id==="1"){
                			var nextT = $(this).next().val().trim()*1;
                			if(nextT&&txt*1>nextT){
                				$("#myModalWarn").addClass("in").css({display:"block"});
                    			$("#myModalWarn").find(".content").html("起始融资额要小于结束融资额");
                    			$(this).val("");
                    			txt = "";
                			}
                		}else{
                			var prevT = $(this).prev().val().trim()*1;
                			if(prevT&&txt*1<prevT){
                				$("#myModalWarn").addClass("in").css({display:"block"});
                    			$("#myModalWarn").find(".content").html("起始融资额要小于结束融资额");
                    			$(this).val("");
                    			txt = "";
                			}
                		}
        			}
        		}
        	}else{
        		if(id==="1"){
        			var nextD = new Date($(this).next().val().trim())*1,
        				prevT = $(this).prev().text().trim();
        			if(nextD&&new Date(txt)*1>nextD){
        				$("#myModalWarn").addClass("in").css({display:"block"});
            			$("#myModalWarn").find(".content").html(prevT+"起始日期不能大于"+prevT+"结束日期");
            			$(this).val("");
            			txt = "";
        			}
        		}else{
        			var prevD = new Date($(this).prev().val().trim())*1,
        				prevT = $(this).prev().prev().text().trim();
        			if(prevD&&new Date(txt)*1<prevD){
        				$("#myModalWarn").addClass("in").css({display:"block"});
            			$("#myModalWarn").find(".content").html(prevT+"结束日期不能小于"+prevT+"起始日期");
            			$(this).val("");
            			txt = "";
        			}
        		}
        	}
        	if(txt&&$(this).hasClass("Wdate")){
        		if (!txt.match(reg)) {
        			$("#myModalWarn").addClass("in").css({display:"block"});
        			$("#myModalWarn").find(".content").html("请输入正确的日期格式");
        			$(this).val("");
        			txt = "";
                }
        	}
        	if(txt){
        		selTitEle.each(function(ind,item){
    	            if($(this).text().trim()===title){
    	            	var selTxts = $(this).next().text().trim();
    	            	$(this).parents("section").show();
    	                var sel = $(this);
    	                if(selTxts){
    	                	if(selTxts.indexOf(tit)>=0){
    	                		$(".tit").each(function(){
    	                			var t = $(this).text().trim();
    	                			if(tit===t){
    	                				if(id==="1"){
    	                					if($(this).next().next().hasClass("next")){
    	                						$(this).next().next().before('<span>'+txt+'</span><span> 至 </span>');
    	                					}else{
    	                						$(this).next().next().text(txt);
    	                					}
    		                            }else{
    		                                if($(this).next().next().next().next().hasClass("next")){
    		                                    $(this).next().next().next().next().text(txt);
    		                                }else{
    		                                	$(this).next().next().after('<span> 至 </span><span class="next">'+txt+'</span>')
    		                                }
    		                            }
    	                			}
    	                		});
    	                	}else{
    	                		if(id==="1"){
    	                    		 sel.next().append('<span>，</span><span class="tit">'+tit+'</span><span>-</span><span>'+txt+'</span>')
    	                    	}else{
    	                    		if(self_.hasClass("financing")){
    	                    			sel.next().append('<span>，</span><span class="tit">'+tit+'</span><span>-</span><span>0</span><span>至</span><span class="next">'+txt+'</span>');
    	                    		}else{
    	                    			sel.next().append('<span>，</span><span class="tit">'+tit+'</span><span>-</span><span class="next">'+txt+'</span>');
    	                    		}
    	                    		
    	                    	}
   	                    	}
    	                }else{
    	                	if(id==="1"){
	                    		 sel.next().append('<span class="tit">'+tit+'</span><span>-</span><span>'+txt+'</span>')
	                    	}else{
	                    		if(self_.hasClass("financing")){
	                    			sel.next().append('<span class="tit">'+tit+'</span><span>-</span><span>0</span><span>至</span><span class="next">'+txt+'</span>');
	                    		}else{
	                    			sel.next().append('<span class="tit">'+tit+'</span><span>-</span><span class="next">'+txt+'</span>');
	                    		}
	                    	}
    	                }
    	            }
    	        });
        	}else{
        		selTitEle.each(function(ind,item){
    	            if($(this).text().trim()===title){
    	            	var sel_det = $(this).next().text().trim(),
    	            		self = $(this);
		        		$(".tit").each(function(){
		        			var t = $(this).text().trim();
		        			if(tit===t){
				        		if(id==="2"){
				        			if(self_.hasClass("financing")){
				        				if($(this).next().next().next().next().hasClass("next")){
				        					if($(this).next().next().text().trim()!=="0"){
				        						$(this).next().next().next().next().text("不限");
				        					}else{
				        						if($(this).prev().text().trim()==="，"){
				                            		$(this).prev().remove();
				                            	}
				        						$(this).next().next().next().next().remove();
				                                $(this).next().next().next().remove();
				                                $(this).next().next().remove();
				                                $(this).next().remove();
				                                $(this).remove();
				                                if(!self.next().text().trim()){
		                                    		self.parents("section").hide();
		                                    	}
				        					}
			                            }else{
			                            	if($(this).next().next().hasClass("next")){
				                            	if($(this).prev().text().trim()==="，"){
				                            		$(this).prev().remove();
				                            	}
				                            	$(this).next().next().remove();
				                            	$(this).next().remove();
				                            	$(this).remove();
				                            	if(!self.next().text().trim()){
		                                    		self.parents("section").hide();
		                                    	}
			                            	}
			                            }
				        			}else{
				        				if($(this).next().next().next().next().hasClass("next")){
			                            	$(this).next().next().next().next().remove();
			                                $(this).next().next().next().remove();
			                                if(!self.next().text().trim()){
	                                    		self.parents("section").hide();
	                                    	}
			                            }else{
			                            	if($(this).next().next().hasClass("next")){
				                            	if($(this).prev().text().trim()==="，"){
				                            		$(this).prev().remove();
				                            	}
				                            	$(this).next().next().remove();
				                            	$(this).next().remove();
				                            	$(this).remove();
				                            	if(!self.next().text().trim()){
		                                    		self.parents("section").hide();
		                                    	}
			                            	}
			                            }
				        			}
				                }else{
				                	if(self_.hasClass("financing")){
				                		if($(this).next().next().next().next().hasClass("next")){
				                			if($(this).next().next().next().next().text().trim()!=="不限"){
				                				 $(this).next().next().text(0);
				                			}else{
				                				if($(this).prev().text().trim()==="，"){
				                            		 $(this).prev().remove();
				                            	 }
				                				$(this).next().next().next().next().remove();
				                				$(this).next().next().next().remove();
				                                $(this).next().next().remove();
				                                $(this).next().remove();
				                                $(this).remove();
				                                if(!self.next().text().trim()){
		                                    		self.parents("section").hide();
		                                    	}
				                			}
			                            }else{
			                            	 if($(this).prev().text().trim()==="，"){
			                            		 $(this).prev().remove();
			                            	 }
			                            	 $(this).next().next().next().remove();
			                                 $(this).next().next().remove();
			                                 $(this).next().remove();
			                                 $(this).remove();
			                                 if(!self.next().text().trim()){
		                                    	self.parents("section").hide();
		                                     }
			                            }
				                	}else{
				                		if($(this).next().next().next().next().hasClass("next")){
				                			if($(this).prev().text().trim()==="，"){
			                            		 $(this).prev().remove();
			                            	 }
			                                $(this).next().next().next().remove();
			                                $(this).next().next().remove();
			                                if(!self.next().text().trim()){
	                                    		self.parents("section").hide();
	                                    	}
			                            }else{
			                            	 if($(this).prev().text().trim()==="，"){
			                            		 $(this).prev().remove();
			                            	 }
			                            	 $(this).next().next().next().remove();
			                                 $(this).next().next().remove();
			                                 $(this).next().remove();
			                                 $(this).remove();
			                                 if(!self.next().text().trim()){
		                                    	self.parents("section").hide();
		                                     }
			                            }
				                	}
				                }
		        			}
		    	        });
    	            }
        		});
        	}
        });
        $(".selectpicker").on("change",function(){    
            var title = $(this).parents(".row").siblings(".contract_title").text().trim(),
                selTitEle = $("#selectTemplate").find(".sel_tit"),
                tit = $(this).siblings("label").text().trim(),
                selVal = $(this).find("option:selected").val(),
                txt = $(this).next().find(".filter-option").text().trim().replace(/\,/g,"/"),
                len = txt.length,
                id = $(this).find("option:selected").attr("data-id"),
                self = $(this);
				if(txt==="无选择项"){
					$(this).next().find(".filter-option").text("");
					txt = "";
				}
                selTitEle.each(function (ind, item) {
                    if ($(this).text().trim() === title) {
                    	$(this).parents("section").show();
                        var selTxt = $(this).next().text().trim(),
                            sel = $(this),
                            exit;
                        var allT = $(this).next().text().trim();
                        if(selTxt){
                            $(this).next().find(".tit").each(function(){
                                if($(this).text().trim()===tit){
                                    exit = true;
                                    if(tit==="品牌"&&txt!==""){
                                		$(this).parent().children().each(function(){
                                			if($(this).text().trim()==="车辆制造商"||$(this).text().trim()==="车型"){
                                				if($(this).prev().text().trim().length===0){
    	                                    		$(this).next().next().next().remove();
    	                                    	}
    	                                    	if($(this).prev().text().trim()==="，"){
    	                                    		$(this).prev().remove();
    	                                    	}
                                				$(this).next().remove();
                                				$(this).next().remove();
                                				$(this).remove();
                                			}
                                		});
                                		if(txt==="不限"){
                                			txt="";
                                		}
                                	}else if(tit==="车辆制造商"&&txt!==""){
                                		$(this).parent().children().each(function(){
                                			if($(this).text().trim()==="车型"){
                                				if($(this).prev().text().trim().length===0){
    	                                    		$(this).next().next().next().remove();
    	                                    	}
    	                                    	if($(this).prev().text().trim()==="，"){
    	                                    		$(this).prev().remove();
    	                                    	}
                                				$(this).next().remove();
                                				$(this).next().remove();
                                				$(this).remove();
                                			}
                                		});
                                		if(txt==="不限"){
                                			txt="";
                                		}
                                	}else if(tit==="项目类型"&&txt!==""){
                                		if(txt==="其他"){
                                			self.parent().next().find("select").attr("disabled",true);
                                			self.parent().next().find(".dropdown-toggle").css("background","#f9f9f9");
                                		}else{
                                			self.parent().next().find("select").attr("disabled",false);
                                			self.parent().next().find(".dropdown-toggle").css("background","#fff");
                                		}
                                		$(this).parent().children().each(function(){
                                			if($(this).text().trim()==="所属项目"){
                                				if($(this).prev().text().trim().length===0){
    	                                    		$(this).next().next().next().remove();
    	                                    	}
    	                                    	if($(this).prev().text().trim()==="，"){
    	                                    		$(this).prev().remove();
    	                                    	}
                                				$(this).next().remove();
                                				$(this).next().remove();
                                				$(this).remove();
                                			}
                                		});
                                		if(txt==="不限"){
                                			txt="";
                                		}
                                	}else if(tit==="大区"&&txt!==""){
                            			$(this).parent().children().each(function(){
                                			if($(this).text().trim()==="片区"||$(this).text().trim()==="分公司"){
                                				if($(this).prev().text().trim().length===0){
    	                                    		$(this).next().next().next().remove();
    	                                    	}
    	                                    	if($(this).prev().text().trim()==="，"){
    	                                    		$(this).prev().remove();
    	                                    	}
                                				$(this).next().remove();
                                				$(this).next().remove();
                                				$(this).remove();
                                			}
                                		});
                            			if(txt==="不限"){
                                			txt="";
                                		}
                                	}else if(tit==="片区"&&txt!==""){
                                		$(this).parent().children().each(function(){
                                			if($(this).text().trim()==="分公司"){
                                				if($(this).prev().text().trim().length===0){
    	                                    		$(this).next().next().next().remove();
    	                                    	}
    	                                    	if($(this).prev().text().trim()==="，"){
    	                                    		$(this).prev().remove();
    	                                    	}
                                				$(this).next().remove();
                                				$(this).next().remove();
                                				$(this).remove();
                                			}
                                		});
                                		if(txt==="不限"){
                                			txt="";
                                		}
                                	}else if(tit==="所属公司"&&txt!==""){
                                		if(txt==="不限"){
                                			txt="";
                                		}
                                	}else if(txt==="不限"||txt==="请选择"){
                                		txt = "";
                                	}
                                    if(txt){
                                    	if(len>16){
	                                    	txt = txt.substr(0,16);
	                                        $(this).next().next().text(txt+'...');
	                                    }else{
	                                        $(this).next().next().text(txt);
	                                    }
                                    }else{
                                		if($(this).prev().text().trim().length===0){
                                    		$(this).next().next().next().remove();
                                    	}
                                    	if($(this).prev().text().trim()==="，"){
                                    		$(this).prev().remove();
                                    	}
                                    	$(this).next().next().remove();
                                    	$(this).next().remove();
                                    	$(this).remove();
                                    	if(!sel.next().text().trim()){
                                    		sel.parents("section").hide();
                                    	}
                                    }
                                    if(tit==="分公司"&&txt!==""){
                                		var prevTi = self.parent().parent().prev().children().eq(1).find("label").text().trim(),
	                    				prevTx = self.parent().parent().prev().children().eq(1).children().find("option:selected").text().trim(),
	                    				prevV = self.parent().parent().prev().children().eq(1).children().find("option:selected").val().trim(),
	                        			prevTit = self.parent().parent().prev().children().last().find("label").text().trim(),
	                        			prevTxt = self.parent().parent().prev().children().last().children().find("option:selected").text().trim(),
	                        			prevVal = self.parent().parent().prev().children().last().children().find("option:selected").val().trim();
		                        		if(allT.indexOf(prevTit)<0&&prevVal){
		                        			$(this).next().next().after("<span>，</span><span class='tit'>"+prevTit+"</span><span>-</span><span>"+prevTxt+"</span>");
		                        		}
		                        		if(allT.indexOf(prevTi)<0&&prevV){
		                        			$(this).next().next().after("<span>，</span><span class='tit'>"+prevTi+"</span><span>-</span><span>"+prevTx+"</span>");
		                        		}
                                	}
                                }else{
                                	if(tit==="项目类型"&&txt!==""){
                                		if(txt==="其他"){
                                			self.parent().next().find("select").attr("disabled",true);
                                			self.parent().next().find(".dropdown-toggle").css("background","#f9f9f9");
                                		}else{
                                			self.parent().next().find("select").attr("disabled",false);
                                			self.parent().next().find(".dropdown-toggle").css("background","#fff");
                                		}
                                		$(this).parent().children().each(function(){
                                			if($(this).text().trim()==="所属项目"){
                                				if($(this).prev().text().trim().length===0){
    	                                    		$(this).next().next().next().remove();
    	                                    	}
    	                                    	if($(this).prev().text().trim()==="，"){
    	                                    		$(this).prev().remove();
    	                                    	}
                                				$(this).next().remove();
                                				$(this).next().remove();
                                				$(this).remove();
                                			}
                                		});
                                	}
                                }
                            });
                            if(!exit){
                            	if(tit==="车辆制造商"){
	                        		var prevTit = self.parent().prev().find("label").text().trim(),
	                        			prevTxt = self.parent().prev().children().find("option[value='"+id+"']").text().trim();
	                        		if(selTxt.indexOf(prevTit)<0){
	                        			$(this).next().append("<span>，</span><span class='tit'>"+prevTit+"</span><span>-</span><span>"+prevTxt+"</span>");				                            
	                        		}else{
	                        			$(this).next().find("span").each(function(){
	                        				var t = $(this).text().trim();
	                        				if(t==="品牌"){
	                        					$(this).next().next().text(prevTxt);
	                        				}
	                        			});
	                        		}
	                            };
	                            if(tit==="分公司"){
	                            	var prevTi = self.parent().parent().prev().children().eq(1).find("label").text().trim(),
	                    				prevTx = self.parent().parent().prev().children().eq(1).children().find("option:selected").text().trim(),
	                    				prevV = self.parent().parent().prev().children().eq(1).children().find("option:selected").val().trim(),
	                        			prevTit = self.parent().parent().prev().children().last().find("label").text().trim(),
	                        			prevTxt = self.parent().parent().prev().children().last().children().find("option:selected").text().trim(),
	                        			prevVal = self.parent().parent().prev().children().last().children().find("option:selected").val().trim();
	                        		if(allT.indexOf(prevTi)<0&&prevV){
	                        			$(this).next().append("<span>，</span><span class='tit'>"+prevTi+"</span><span>-</span><span>"+prevTx+"</span>");
	                        		}else{
	                        			$(this).next().find("span").each(function(){
	                        				var t = $(this).text().trim();
	                        				if(t==="大区"){
	                        					$(this).next().next().text(prevTx);
	                        				}
	                        			});
	                        		}
	                        		if(allT.indexOf(prevTit)<0&&prevVal){
	                        			$(this).next().append("<span>，</span><span class='tit'>"+prevTit+"</span><span>-</span><span>"+prevTxt+"</span>");
	                        		}else{
	                        			$(this).next().find("span").each(function(){
	                        				var t = $(this).text().trim();
	                        				if(t==="片区"){
	                        					$(this).next().next().text(prevTxt);
	                        				}
	                        			});
	                        		}
	                            };
	                            if(tit==="片区"){
	                        		var prevTit = self.parent().prev().find("label").text().trim(),
	                        			prevTxt = self.parent().prev().children().find("option:selected").text().trim(),
	                        			prevV = self.parent().prev().children().find("option:selected").val().trim();
	                        		if(allT.indexOf(prevTit)<0&&prevV){
	                        			$(this).next().append("<span>，</span><span class='tit'>"+prevTit+"</span><span>-</span><span>"+prevTxt+"</span>");
	                        		}else{
	                        			$(this).next().find("span").each(function(){
	                        				var t = $(this).text().trim();
	                        				if(t==="大区"){
	                        					$(this).next().next().text(prevTxt);
	                        				}
	                        			});
	                        		}
	                            };
                                if(len>16){
                                	txt = txt.substr(0,16);
                                    $(this).next().append('<span>，</span><span class="tit">'+tit+'</span><span>-</span><span>'+txt+'...</span>')
                                }else{
                                    $(this).next().append('<span>，</span><span class="tit">'+tit+'</span><span>-</span><span>'+txt+'</span>')
                                }
                            }
                        }else{
                        	if(tit==="项目类型"&&txt!==""){
                        		if(txt==="其他"){
                        			self.parent().next().find("select").attr("disabled",true);
                        			self.parent().next().find(".dropdown-toggle").css("background","#f9f9f9");
                        		}else{
                        			self.parent().next().find("select").attr("disabled",false);
                        			self.parent().next().find(".dropdown-toggle").css("background","#fff");
                        		}
                        	}
                        	if(tit==="车辆制造商"){
                        		var prevTit = self.parent().prev().find("label").text().trim(),
                        			prevTxt = self.parent().prev().children().find("option[value='"+id+"']").text().trim();
                        		$(this).next().append("<span class='tit'>"+prevTit+"</span><span>-</span><span>"+prevTxt+"</span><span>，</span>");
                            };
                            if(tit==="分公司"){
                        		var prevTi = self.parent().parent().prev().children().eq(1).find("label").text().trim(),
                    				prevTx = self.parent().parent().prev().children().eq(1).children().find("option:selected").text().trim(),
                    				prevV = self.parent().parent().prev().children().eq(1).children().find("option:selected").val().trim(),
                        			prevTit = self.parent().parent().prev().children().last().find("label").text().trim(),
                        			prevTxt = self.parent().parent().prev().children().last().children().find("option:selected").text().trim(),
                        			prevVal = self.parent().parent().prev().children().last().children().find("option:selected").val().trim();
                        		if(prevV){
                        			$(this).next().append("<span class='tit'>"+prevTi+"</span><span>-</span><span>"+prevTx+"</span><span>，</span>");
                        		}
                        		if(prevVal){
                        			$(this).next().append("<span class='tit'>"+prevTit+"</span><span>-</span><span>"+prevTxt+"</span><span>，</span>");
                        		}
                            };
                            if(tit==="片区"){
                        		var prevTit = self.parent().prev().find("label").text().trim(),
                        			prevTxt = self.parent().prev().children().find("option:selected").text().trim(),
                        			prevV = self.parent().prev().children().find("option:selected").val().trim();
                        		if(prevV){
                        			$(this).next().append("<span class='tit'>"+prevTit+"</span><span>-</span><span>"+prevTxt+"</span><span>，</span>");
                        		}
                            };
                            if(len>16){
                            	txt = txt.substr(0,16);
                                $(this).next().append('<span class="tit">'+tit+'</span><span>-</span><span>'+txt+'...</span>');
                            }else{
                                $(this).next().append('<span class="tit">'+tit+'</span><span>-</span><span>'+txt+'</span>');
                            }
                        }
                    }
                });
	           
        });
    };
    initTemplate = function(){
    	$.ajax({
    		url:contextPath+"/entryDetails/queryTemplateAll.koala",
    		type:"get",
    		dataType:"json",
    		success:function(data){
    			if(data.data){
    				var tempNm = data.data,
    				dom = "";
	    			$.each(tempNm,function(ind,item){
	    				dom+='<span><i>'+item[3]+'</i><b class="remove_template" class="removeTmp">&times;</b></span>'
	    			});
	    			$("#generationTemplate").append(dom);
    			}
    		}
    	});
    };
    //生成模板
    makeTemplate = function(){
    	 initTemplate();
    	 maxV = "";
         $("#enterTemplate").on("click","button",function(){
        	 var strApplyDt = $("#applyDS").val().trim(), //申请日期
				endApplyDt = $("#appDE").val().trim();
        	 $("#templateName").val("");
        	 if(!strApplyDt||!endApplyDt){
 				var txt = $(".sel_det").first().text().trim();
 				if(txt.indexOf("申请编号")<0&&txt.indexOf("客户名称")<0&&txt.indexOf("车架号")<0&&txt.indexOf("合同取消日期")<0){
     				$("#myModalWarn").addClass("in").css({display:"block"});
         			$("#myModalWarn").find(".content").html("申请日期的前后日期都要填写");
         			return false;
     			}
     		}
            $("#myModalLabel").addClass("in").css({"display":"block"});
         });
        $("#myModalLabel").on("click","#preserve",function(){
            var val = $("#templateName").val().trim(),
            	len = val.length,
                child = $("#generationTemplate").children(),
                news;
            if(len>0){
                $.each(child,function(){
                    if($(this).children("i").text().trim()===val){
                        $("#myModalLabel").removeClass("in").css({"display":"none"});
                        $("#myModalExit").addClass("in").css({"display":"block"});
                        news = true;
                    }
                });
                if(!news){
                	var child = $("#generationTemplate").children();
              	    if(child.length>=5){
              	    	$("#myModalLabel").removeClass("in").css({"display":"none"});
                        $("#myModalFail").addClass("in").css({"display":"block"});
                    }else{
                    	var tempName = $("#templateName").val().trim(),
                    	datas = {};
	                    $("#choice_sel .contract_title").each(function(){
	                    	var key = $(this).text().trim();
	                    	datas[key] = {};
	                    	$(this).parent().find(".col-xs-4").each(function(){                   		
	                    		var lab = $(this).children("label").text().trim(),
	                    			val;
	                    		if($(this).children().last().is("input")){
	                    			if($(this).children().last().prev().is("input")){
	                    				val = $(this).children().last().prev().val().trim()+","+$(this).children().last().val().trim();
	                    			}else{
	                    				val = $(this).children().last().val().trim();
	                    			}
	                    		}else{
	                    			var Ct = $(this).children().last().find(".filter-option").text().trim();
	                    			if(Ct==="请选择"||Ct==="无选择项"||Ct==="不限"){
	                    				val = "";
	                    			}else{
	                    				val = Ct;
	                    			}
	                    		}
	                    		datas[key][lab]=val;
	                    	});
	                    });
	                    $.ajax({
	                  	  url:contextPath+"/entryDetails/buildTemplate.koala",
	                  	  type:"post",
	                  	  dataType:"json",
	                  	  data:{
	                  		  tempName:tempName,
	                    	  tempCntnt:JSON.stringify(datas),
	                    	  pageType:"进件明细报表"
	                  	  },
	                  	  success:function(data){
	                  		  if(data.data.msg){
	                  			 $("#generationTemplate").append('<span><i>'+tempName+'</i><b class="remove_template" class="removeTmp">&times;</b></span>');
	                  			 $("#myModalLabel").removeClass("in").css({"display":"none"});
	                  			$("#generationTemplate span").removeClass("light")
	                  		  }
	                  	  }
	                    });
                    }
                }
            }else if(len<=0){
    			$("#myModalWarn").addClass("in").css({display:"block"});
    			$("#myModalWarn").find(".content").html("模板名称不能为空！");
            }
        });
        $("#myModalLabel").on("click","#close,#cancel",function(){
            $("#myModalLabel").removeClass("in").css({"display":"none"});
        });
        $("#myModalFail").on("click","#Close,#ensure",function(){
            $("#myModalFail").removeClass("in").css({"display":"none"});
        });
        $("#myModalExit").on("click","#ensure_",function(){
            $("#myModalExit").removeClass("in").css({"display":"none"});
            $("#myModalLabel").addClass("in").css({"display":"block"});
        });
    };
    //模板显示
    templateSH = function(){
        $("#generationTemplate").on("click","i",function(){
            $(this).parent().addClass("light").siblings().removeClass("light");
            var name = $(this).text().trim();
            $.ajax({
        		url:contextPath+"/entryDetails/queryTemplateAll.koala",
        		type:"get",
        		dataType:"json",
        		success:function(data){
        			var tempJson = data.data;
        			$(".sel_det").html("");
        			$.each(tempJson,function(ind,item){
        				if(item[3]===name){
        					var tempData = JSON.parse(item[2]),
        						ele = $("#choice_sel .contract_title"),
        						selEle = $("#selectTemplate .sel_tit");
        					$.each(ele,function(){
        						var tit = $(this).text().trim(),
        							fillEle = $(this).parent().find(".col-xs-4");
        						$.each(fillEle,function(){
        							var txt = $(this).children("label").text().trim(),
        								val = tempData[tit][txt];
        							if(!val){
        								val = "";
        							}
        							if($(this).children().last().is("input")){
        								if($(this).children().last().prev().is("input")){
        									if(val){
        										var arr = val.split(",");
            									$(this).children().last().prev().val(arr[0]);
            									$(this).children().last().val(arr[1]);
        									}
        								}else{
        									var self = $(this);
        									if(val.indexOf(",")>=0){
        										var arr = val.split(",");
        										$.each(arr,function(ind,item){
        											if(item){
        												self.children().last().val(item);
        											}
        										});
        									}else{
        										$(this).children().last().val(val);
        									}
        								}
                            		}else{
                            			var sel = $(this).children("select")
                            			var txt = $(this).children("label").text().trim(),
        								val = tempData[tit][txt];
                            			if(!val){
                            				val = "";
                            			}
	        							if($(this).children().last().is("input")){
	                            			$(this).children().last().val(val);
	                            		}else{
	                            			$(this).children().last().find("li").each(function(){
	                            				var t = $(this).text().trim();
	                            				if(val.indexOf(t)>=0){
	                            					$(this).addClass("selected")
	                            				}else{
	                            					$(this).removeClass("selected")
	                            				}
	                            			});
	                            			sel.find("option").each(function(){
	                            				if($(this).text().trim()===val){
	                            					$(this).prop("selected",true)
	                            				}
	                            			});
	                            			if(val){
	                            				$(this).children().last().find("span:eq(0)").text(val);
		                            			$(this).children().last().find("button").attr("title",val);
	                            			}else{
	                            				if(!sel.attr("multiple")){
		                            				$(this).children().last().find("span:eq(0)").text("不限");
			                            			$(this).children().last().find("button").attr("title","不限");
		                            			}else{
		                            				$(this).children().last().find("span:eq(0)").text("");
			                            			$(this).children().last().find("button").attr("title","不限");
		                            			}
	                            			}
	                            		}
                            		}
        						});
        					});
        					$.each(selEle,function(){
        						var k = $(this).text().trim(),
        							curObj = tempData[k],
        							curDom = "",
        							flag;
        						for(var i in curObj){  
        							if(curObj[i]&&curObj[i]!==","){
        								var len = curObj[i].length;
        								if(i==="融资额"){
        									curObj[i] = curObj[i].split(",");
            								if(!curObj[i][0]){
            									curObj[i][0]=0;
            								}
            								if(!curObj[i][1]){
            									curObj[i][0]="不限";
            								}
            							}else if(curObj[i].indexOf(",")>0&&curObj[i].indexOf(",")!==(len-1)){
        									if(["申请日期","合同生效日期","合同取消日期"].indexOf(i.trim())>=0){
            									curObj[i] = curObj[i].split(",");
            								}else{
            									curObj[i] = curObj[i].replace(/\,/g,"/");
            								}
        								}else{
        									curObj[i] = curObj[i].replace(/\,/g,"");
        								}
            							var len = curObj[i].length;
            							
            							if(len>=16){
            								if(!flag){
            									curDom += '<span class="tit">'+i+'</span><span>-</span><span>'+curObj[i].substr(0,16)+'...</span>'
                								flag = true;
                							}else{
                								curDom += '<span>，</span><span class="tit">'+i+'</span><span>-</span><span>'+curObj[i].substr(0,16)+'...</span>'
                							}
            								
            							}else{
            								
            								if(!flag){
            									if(curObj[i] instanceof Array){
            										curDom += '<span class="tit">'+i+'</span><span>-</span><span>'+curObj[i][0]+'</span><span>至</span><span class="next">'+curObj[i][1]+'</span>'
            									}else{
            										curDom += '<span class="tit">'+i+'</span><span>-</span><span>'+curObj[i]+'</span>'
            									}
                								flag = true;
                							}else{
                								if(curObj[i] instanceof Array){
            										curDom += '<span>，</span><span class="tit">'+i+'</span><span>-</span><span>'+curObj[i][0]+'</span><span>至</span><span class="next">'+curObj[i][1]+'</span>'
            									}else{
            										curDom += '<span>，</span><span class="tit">'+i+'</span><span>-</span><span>'+curObj[i]+'</span>'
            									}
                							}
            							}
        							}
        						}
        						$(this).next().append(curDom);
        						if($(this).next().text().trim()){
        							$(this).parents("section").show();
        						}
        					});
        					$(".sel_det").each(function(){
        						if($(this).text().trim() === ""){
        							$(this).parent().hide();
        						}
        					});
        				}
        			});
        		}
        	});
        });
    };
    //删除模板
    removeTemp = function(){
        $("#generationTemplate").on("click","b",function(e){
        	var that = $(this);
        	$.delModal("删除模板",function(){    		
        		that.parents("span").remove();
                var name = that.prev().text().trim();
                $.ajax({
                	 url:contextPath+"/entryDetails/delTemplate.koala",
                  	 type:"post",
                  	 data:{
                  		tempName:name
                  	 },
                  	 dataType:"json",
                  	 success:function(data){
                  		 if(that.parent().hasClass("light")){
                  			$.createLoading();
                    		initDate();
                        	ajaxSel();
                    		areaLink();
                    		carLink();
                    		programLink();
                    		$(".sel_length").val("");
                    		$(".sqrq").val("");
                    		$("#generationTemplate span").each(function(){
                    			if($(this).hasClass("light")){
                        			$(this).removeClass("light");
                        		}
                    		});
                    		$("#pactDS,#pactDE,#cancelDS,#cancelDE").val("");
                    		noConTable(1);
                    		$.closeLoading();
                  		 }
                  	 }
                });
        	},"您确定要删除该模板吗？");
        	$("#delModal").find(".modal-header").css("display","none");
        	$("#delModal").find(".modal-content").css({top:"0"});
        });
    };
    defaultExportStu = function(){
    	$("#pageChoice p").find("span").first().find("img").attr("src",contextPath+"/pages/carCustomerPortrait/img/change.png");
    	$("#pageChoice p").find("span").first().siblings().find("img").attr("src",contextPath+"/pages/carCustomerPortrait/img/before_change.png");
        $("#titSel span").find("img").attr("src",contextPath+"/pages/carCustomerPortrait/img/before_check.png");
        $("#titSel span").find("img").attr("data-id","1");
        $("#initialChoice span:eq(0)").addClass("active").siblings().removeClass("active");
        $("#selAll span").find("img").attr("src",contextPath+"/pages/carCustomerPortrait/img/before_check.png");
        $("#selDetail").html("");
        $("#startPg,#endPg").attr("disabled",true);
        $("#startPg,#endPg").css("background","#f9f9f9");
        if($("#pageChoice p").children().last().hasClass("att")){
        	$("#pageChoice p").children().last().prev().remove();
        	$("#pageChoice p").children().last().remove();
        }
        $.ajax({
			url:contextPath+"/entryDetails/getFirstLter.koala",
        	 type:"post",
        	 data:{
        		 first_lter:"A"
        	 },
        	 dataType:"json",
        	 success:function(data){
        		 var headData = data.data[0],
        		 	 headDom = "";
        		 $.each(headData,function(ind,item){
        			 if(item){
        				 if(ind%2==0){
        					 headDom+='<span data-val="'+headData[ind+1]+'"><img data-id="1" src="'+contextPath+'/pages/carCustomerPortrait/img/before_check.png" alt="" class="single_sel">'+item+'</span>'
            			 } 
        			 }
        		 });
        		 $("#titSel").html(headDom);
        	 }
        });
    };
    fromHeadsel = function(ele){
    	var id = ele.find("img").attr("data-id"),
    		txt = ele.text().trim(),
    		headDom = "",
    		selDetail = $("#selDetail").text().trim();
    	selDetail = selDetail.substring(0,selDetail.length-1);
    	if(selDetail==="全选"){
    		$("#selAll").find("img").attr("src",contextPath+"/pages/carCustomerPortrait/img/before_check.png");
    		 $.each(QXData,function(ind,item){
     			 if(ind%2===0){
     				headDom+="<span><b data-val='"+QXData[ind+1]+"'>"+item+"</b><i class='removeSel'>&times;</i></span>"          			
	          	 }
     		 });
    		 $("#selDetail").html(headDom);
    		 check = false;
    	}
    	if(id==="1"){
    		var txt = ele.text().trim(),
    			val = ele.attr("data-param");
    		ele.find("img").attr("src",contextPath+"/pages/carCustomerPortrait/img/checked.png");
            $("#selDetail").append("<span><b data-val='"+val+"'>"+txt+"</b><i class='removeSel'>&times;</i></span>");
            ele.find("img").attr("data-id","2");
            
    	}else{
    		var txt = ele.text().trim();
    		ele.find("img").attr("src",contextPath+"/pages/carCustomerPortrait/img/before_check.png");
    		ele.find("img").attr("data-id","1");
            $("#selDetail").find("span").each(function(){
            	var val = $(this).find("i").prev().text().trim();
            	if(val===txt){
            		$(this).remove();
            	}
            });
    	}
    };
    isPower = function(){
    	$.ajax({
       	 	 url:contextPath+"/entryDetails/isEpt.koala",
         	 type:"get",
         	 dataType:"json",
         	 success:function(data){
         		 if(data.data){
         			 if($("#entry_table tbody").children().hasClass("no-records-found")){
         				 $("#exportBtn").prop("disabled",true)
         			 }else{
         				 $("#exportBtn").prop("disabled",false)
         			 }
         			 $("#export button").show();
         		 }else{
         			$("#export button").hide();
         		 } 
         	 }
       });
    };
    exportSelect = function(){
    	//导出按钮
    	$("#export").on("click","#exportBtnEnsure",function(){
    		$.createLoading();
    		$("#myExportModal").removeClass("in").css({"display":"none"});
    		var pageNo = "",
				pageSize = "",
				startPage = "",
				endPage = "",
				header = '',
				pageAll = 0,
				isExp = true,
				maxPage = 0,
				tSl;
    		$("#pageChoice span").each(function(){
    			if($(this).children("img").attr("src")==="/pm/pages/carCustomerPortrait/img/change.png"){
    				pageSize = parseInt($(".page-size").text().trim());
    				var txt = $(this).text().trim(),
    					selPg = 0;
	    				pageAll = $("#pageAllN").text().trim()*1;
	        			maxPage = 90000/pageSize;
	        			tSl = txt;
    				if(txt==="自定义"){
						startPage = $("#startPg").val().trim()*1;
    					endPage = $("#endPg").val().trim()*1;
    					if(!startPage){
    						startPage = 0;
    					}
    					if(!endPage){
    						endPage = 0;
    					}
    					selPg = endPage - startPage+1;
    					if(selPg>maxPage){
    						$("#myModalWarn").addClass("in").css({display:"block"});
    	        			$("#myModalWarn").find(".content").html("您选择的导出页已超出最大页，请重新选择");
    	        			isExp = false;
    					}
    				}else if(txt==="当前页"){
    					$(".page-numbers li").each(function(){
        					if($(this).hasClass("active")){
        						pageNo = $(this).text().trim();	
        					}
        				});
    				}else{
    					if(pageAll>maxPage){
    						$("#myModalWarn").addClass("in").css({display:"block"});
    	        			$("#myModalWarn").find(".content").html("您选择的导出页已超出最大页，请重新选择");
    	        			isExp = false;
    	        		}
    				}
    			}
    		});
    		var pageAll = $("#pageAllN").text().trim()*1;
    		if(tSl==="自定义"){
    			if(endPage-startPage>maxPage){
    				$("#myModalWarn").addClass("in").css({display:"block"});
        			$("#myModalWarn").find(".content").html("自定义导出数超过最大页");
        			$.closeLoading();
        			return false;
    			}
    			if(startPage>pageAll||endPage>pageAll){
					$("#myModalWarn").addClass("in").css({display:"block"});
	    			$("#myModalWarn").find(".content").html("自定义导出数超过最大页");
	    			$.closeLoading();
	    			return false;
	    		}
    			if(!startPage||!endPage){
    				$("#myModalWarn").addClass("in").css({display:"block"});
    				if(!startPage){
    					$("#myModalWarn").find(".content").html("您没有选择起始页，请重新选择");
    				}else{
    					$("#myModalWarn").find(".content").html("您没有选择结束页，请重新选择");
    				}
	    			$.closeLoading();
	    			return false;
    			}
    		}
    		var selDT = $("#selDetail").text().trim();
    		if(selDT&&selDT.substr(0,selDT.length-1)!=="全选"){
    			$("#selDetail").children().each(function(){
    				var key = $(this).children("b").text().trim(),
    					val = $(this).children("b").attr("data-val");
    				header+=key+':'+val+','
    			});
    		}else{
    			header = "";
    		}
    		header = header.substr(0,header.length-1);
    		strApplyDt = searchCon.strApplyDt;
    		endApplyDt = searchCon.endApplyDt;
    		strEffDt = searchCon.strEffDt;
    		strCancel = searchCon.strCancel;
    		endCancel = searchCon.endCancel;
    		strfancAmt = searchCon.strfancAmt;
    		endfancAmt = searchCon.endfancAmt;
    		endEffDt = searchCon.endEffDt;
    		entryDetails = searchCon.entryDetails;
    		 defaultExportStu();
    		 if(isExp){
    			 $.ajax({
    	    			url:contextPath+"/entryDetails/getResultList.koala",
    	    			type:"post",
    	    			data:{
    	    				pageNo:pageNo,
    	    				pageSize:pageSize,
    	    				startPage:startPage,
    	    				endPage:endPage,
    	    				strApplyDt:strApplyDt,
    	    				endApplyDt:endApplyDt,
    	    				strEffDt:strEffDt,
    	    				endEffDt:endEffDt,
    	    				strCancel:strCancel,
    	    				endCancel:endCancel,
    	    				strfancAmt:strfancAmt,
    	    				endfancAmt:endfancAmt,
    	    				header:header,
    	    				entryDetails:entryDetails
    	    			},
    	    			success:function(data,sta,xhr){
    	    				$.closeLoading();
    		    		    var generaterNo = data.data;
    		    		    if(generaterNo){
    		    		    	setTimeout(function(){
    		    		    		$("#downloadSuccess").removeClass("hide");
    		    		    	},1000);
    		    		    	setTimeout(function(){
    		    		    		$("#downloadSuccess").addClass("hide");
    		    		    	},3000);
    		    		    	$.createExport({
									action : '/pm/entryDetails/generaterExcel',
									childInput : [{
										name : 'uuid',
										value : generaterNo
									}]
								});
    		    		    }else{
    		    		    	$("#downloadFail").removeClass("hide");
    		    		    	setTimeout(function(){
    		    		    		$("#downloadSuccess").addClass("hide");
    		    		    	},1000);
    		    		    }
    	    			}
    	    		});
    		 }else{
    			 $.closeLoading();
    		 }
    	});
    	$("#export").on("click","#close,#exportCancel,#exportBtn",function(){
    		$("#startPg,#endPg").val("");
    		defaultExportStu();
    	});
        //页码的单选
        $("#export").on("click","#pageChoice span:lt(3)",function(){
        	var pageAll = $("#pageAllN").text().trim(),
        		pageS = parseInt($(".page-size").text().trim()),
        		maxPage = 90000/pageS,
        		ind = $(this).index();
        	$("#startPg,#endPg").val("");
        	if(ind===2){
        		if(pageAll>maxPage){
        			if(!$("#pageChoice p").children().last().hasClass("att")){
            			$("#pageChoice p").append("<br><span class='att'>注：最多可导出"+maxPage+"页，超出最大限制，建议使用自定义模式分批导出！</span>");
            		}
        		}
        	}else{
        		if($("#pageChoice p").children().last().hasClass("att")){
        			$("#pageChoice p").children().last().prev().remove();
        			$("#pageChoice p").children().last().remove();
        		}
        	}
            $(this).find("img").attr("src",contextPath+"/pages/carCustomerPortrait/img/change.png");
            $(this).siblings().find("img").attr("src",contextPath+"/pages/carCustomerPortrait/img/before_change.png"); 
            if(ind===3){
            	$("#startPg,#endPg").attr("disabled",false);
            	$("#startPg,#endPg").css("background","#fff");
            }else{
            	$("#startPg,#endPg").attr("disabled",true);
            	$("#startPg,#endPg").css("background","#f9f9f9");
            }
        });
        
        $("#startPg,#endPg").change(function(){
        	var val = $(this).val()*1,
        		id = $(this).attr("id"),
        		t,
	        	pageAll = $("#pageAllN").text().trim(),
	    		pageS = parseInt($(".page-size").text().trim()),
	    		maxPage = 90000/pageS;
        	if(val<=0){
        		$("#myModalWarn").addClass("in").css({display:"block"});
    			$("#myModalWarn").find(".content").html("所选页码不能小于或等于0，请重新输入！");
    			$(this).val("");
        	}else{
        		if(id==="endPg"){
        			t = $("#startPg").val().trim()*1;
            		if(t&&val*1<t){
            			$("#myModalWarn").addClass("in").css({display:"block"});
            			$("#myModalWarn").find(".content").html("结束页码要大于起始页码");
            			$(this).val("");
            		}
        			val = val-t+1;
        			if(val>maxPage){
	            		if(!$("#pageChoice p").children().last().hasClass("att")){
	            			$("#pageChoice p").append("<br><span class='att'>注：最多可导出"+maxPage+"页，超出最大限制，请重新选择输入！</span>");
	            		}
	            	}else{
	            		if($("#pageChoice p").children().last().hasClass("att")){
	            			$("#pageChoice p").children().last().prev().remove();
	            			$("#pageChoice p").children().last().remove();
	            		}
	            	}
        		}else{
        			t = $(this).next().next().val().trim()*1;
            		if(t&&val*1>t){
            			$("#myModalWarn").addClass("in").css({display:"block"});
            			$("#myModalWarn").find(".content").html("起始页码要小于结束页码");
            			$(this).val("");
            		}
        		}
        	}
        });
        //表头首字母的选择
        $("#export").on("click","#initialChoice span",function(){
            $(this).addClass("active").siblings().removeClass("active");
            var initial = $(this).text().trim(),
            	imgS = $("#selAll").find("img").attr("src"),
            	el = $(this);
            if(imgS === contextPath+"/pages/carCustomerPortrait/img/checked.png"){
            	$("#selAll").find("img").attr("src",contextPath+"/pages/carCustomerPortrait/img/before_check.png");
            	$("#selDetail").html("");
            }
    		$.ajax({
    			 url:contextPath+"/entryDetails/getFirstLter.koala",
            	 type:"post",
            	 data:{
            		 first_lter:initial
            	 },
            	 dataType:"json",
            	 success:function(data){
            		 var headDatas = data.data[0],
            		 	 headDom = "";
            		 $.each(headDatas,function(ind,item){
            			 if(item){          				 
            				 if(ind%2==0){
            					 var isT = $("#selDetail").text().trim();
                        		 if(isT){                        			 
                    				 if(isT.indexOf(item)>=0){
                    					 headDom+='<span data-param="'+headDatas[ind+1]+'"><img data-id="1" src="'+contextPath+'/pages/carCustomerPortrait/img/checked.png" alt="" class="single_sel">'+item+'</span>'
                    				 }else{
                    					 headDom+='<span data-param="'+headDatas[ind+1]+'"><img data-id="1" src="'+contextPath+'/pages/carCustomerPortrait/img/before_check.png" alt="" class="single_sel">'+item+'</span>'
                    				 }                       				 
                        		 }else{
                        			 headDom+='<span data-param="'+headDatas[ind+1]+'"><img data-id="1" src="'+contextPath+'/pages/carCustomerPortrait/img/before_check.png" alt="" class="single_sel">'+item+'</span>'
                        		 }          					 
                			 } 
            			 }
            		 });
            		 $("#titSel").html(headDom);
            	 }
    		});
        });
        //全选
        $("#export").on("click","#selAll span",function(){
        	if(check){
        		$(this).find("img").attr("src",contextPath+"/pages/carCustomerPortrait/img/before_check.png");
       		 	$("#titSel span").each(function(){
                	$(this).find("img").attr("src",contextPath+"/pages/carCustomerPortrait/img/before_check.png");
                });
                $("#initialChoice span").each(function(ind){
                	$(this).removeClass("active");
                 });
                 $("#titSel").html("");
       		 	 $("#selDetail").html("");
                 check = false;
        	}else{
        		 $(this).find("img").attr("src",contextPath+"/pages/carCustomerPortrait/img/checked.png");
        		 $.ajax({
 	    			url:contextPath+"/entryDetails/getFirstLter.koala",
 	            	 type:"post",
 	            	 async:false,
 	            	 data:{
 	            		 first_lter:"QX"
 	            	 },
 	            	 dataType:"json",
 	            	 success:function(data){
 	            		 var dataH = data.data[0];
 	            		 QXData = dataH;
 	            		 headDom = "";
 	            		 $.each(dataH,function(ind,item){
 	            			 if(ind%2===0){
 	            				headDom+='<span data-param="'+dataH[ind+1]+'"><img data-id="1" src="'+contextPath+'/pages/carCustomerPortrait/img/before_check.png" alt="" class="single_sel">'+item+'</span>'          			
 	    	          		 }
 	            		 });
 	            		$("#titSel").html(headDom);
 	            		$("#selDetail").html("<span><b>全选</b><i class='removeSel'>&times;</i></span>");
 	          		    $("#titSel span").each(function(){
 	                    	$(this).find("img").attr({"src":contextPath+"/pages/carCustomerPortrait/img/checked.png","data-id":"2"});
 	                    });
 	                    $("#initialChoice span").each(function(){
 	                   	 $(this).addClass("active");
 	                    });
 	                    check = true;
 	            	 }
     			});
        		 
        	}       	
        });
        //表头的多选
        $("#export").on("click","#titSel span",function(){
        	fromHeadsel($(this));   
        });
        //表头的删除
        $("#export").on("click",".removeSel",function(){
            $(this).parent().remove();
            var txt = $(this).prev().text().trim();
            $("#titSel span").each(function(){
            	var text = $(this).text().trim();
            	if(text===txt){
            		$(this).find("img").attr("src",contextPath+"/pages/carCustomerPortrait/img/before_check.png");
            	}
            });
        });
    };
    $(function() {
        //初始化加载方法
        initMethod(); // 初始化调用方法
        $.closeLoading();
    });
})();
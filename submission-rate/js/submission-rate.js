$(function () {
    var init,//初始化方法
        initSelect,//初始化下拉框
        dateInit, //日期控件
        addZero, //补零
        initTimeASel, //初始化日期范围和团队框
        serveTime, //数据的最大时间
        changeDT, //切换时间数据
        changeOrder, //切换排序
        changeTeam, //切换团队
        changeQuota, //切换指标
        changeDGS, //切换时间
        changeTA, //切换时间
        upperHalf, //下半部分
        topHalf, //上半部分
        sumData, //总计数据
        group, //分组数据
        teamDS, //团队数据选项
        getallotsubmitratechart, //分配提交率
        getteamcontrastchart, //各团队整点数据对比
        genPath,
        gettrendchart; //24小时趋势对比图
    var arr = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"],
		timeArr;
    addZero = function(n){
    	return n = n>10 ? n : "0" + n;
    };
    getPath = function(){
    	return document.location.origin;
    };
    dateInit = function () {
        $("#detailDate").datetimepicker({
            language: 'zh-CN',
            minView: "month",
            autoclose: true,
            todayBtn: true
        });
    };
    initSelect = function () {
        var distributeRate = $(".distribute-rate"), //分配提交率
            order = $("#teamOrder"), //顺序Or降序
            teamSel = $("#teamSel"), //团队选择
            distributeRateDom = '',
            orderDom = '',
            teamSelDom = '';
        distributeRateDom = '<option value="rs001" data-id="4">分配提交率</option>' +
            				'<option value="rs002" data-id="5">拨打提交率</option>' +
            				'<option value="S0001" data-id="1">分配量</option>' +
            				'<option value="S0002" data-id="2">拨打量</option>' +
            				'<option value="S0003" data-id="3">提交件</option>';
        distributeRate.selectpicker();
        distributeRate.empty().append(distributeRateDom);
        distributeRate.selectpicker("render");
        distributeRate.selectpicker("refresh");
        orderDom = '<option value="desc">降序</option>' +
            	   '<option value="asc">升序</option>';
        order.selectpicker();
        order.empty().append(orderDom);
        order.selectpicker("render");
        order.selectpicker("refresh");
        teamSel.selectpicker();
    };

    initTimeASel = function(){
    	$.ajax({
    		url:getPath()+'/pm/twentyFourSubmissionRate/getServerTimeAndTeam.koala',
    		type:'get',
    		dataType:'json',
    		async:false,
    		success:function(data){
    			var data = data.data;
    			if(data){
    				var maxMin = data.calendar,
    					schedule = data.server_time,
    					tArr = schedule.split(" "),
    					later = tArr[0] + " " + tArr[1].substring(0,tArr[1].indexOf(":"))+":00:00";
    					team = data.team,
    					teamSel = $("#teamSel"), //团队选择
    					teamT = teamSel.text().trim();
    				serveTime = schedule;
    				teamDS = [];
    				$("#detailDate").val(tArr[0]);
    				$("#detailDate").datetimepicker('setStartDate', maxMin[0]);
    				$("#detailDate").datetimepicker('setEndDate', maxMin[1]);
    				$.each(team, function(ind, item){
    					teamDS.push(item);
    				});
    				if(!teamT){
    					var teamSelDom = '<option value="">团队总计</option>';
    					$.each(team, function(ind, item){
        					teamSelDom += '<option value="'+item+'">'+item+'</option>'
        				});
        				teamSel.selectpicker();
        				teamSel.empty().append(teamSelDom);
        				teamSel.find("option[value='']").prop("selected",true);
        				teamSel.selectpicker("render");
        				teamSel.selectpicker("refresh");
    				}
    			}
    		}
    	});
    };
    changeDT = function(){
    	if($(this).parent().hasClass("optional")){
    		$.createLoading();
    		$(this).addClass("active").parent().siblings().find("span").removeClass("active");
    		var seriesD = [],
				nowT, 
				xAixD = [],
				allot = [],
				dial = [],
				submit = [],
				allotR = [],
				dialR = [];
    		nowT = $(this).text().trim();
			$.each(group,function(ind,item){
				if(item[0]===nowT){
					xAixD.push(item[1]);
					allot.push(item[2]);
					dial.push(item[3]);
					submit.push(item[4]);
					allotR.push(item[5]);
					dialR.push(item[6]);
				}
			});
			var ym = $("#detailDate").val().trim().split("-");
			ym.pop();
			ym = ym.join("-");
			$.each(sumData,function(ind,item){
				if(item[0]===nowT){
					$("#allot").text(item[1]);
					$("#dial").text(item[2]);
					$("#submit").text(item[3]);
					var allotSubmitRatechart = echarts.init(document.getElementById('allotSubmitRate'));
					allotSubmitRatechartOption.title.text = "分配提交率 \n\n  "+ym;
					allotSubmitRatechartOption.series[0]["data"][1]["value"] = item[4];
					allotSubmitRatechartOption.series[0]["data"][1]["name"] = "分配提交率";
					allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["normal"]["color"] = '#6c73fd';
					allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["emphasis"]["textStyle"]["color"] = '#6c73fd';
					allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["normal"]["label"]["textStyle"]["color"] = '#6c73fd';
					allotSubmitRatechartOption.series[0]["data"][0]["value"] = 100 - item[4];
    		        allotSubmitRatechart.setOption(allotSubmitRatechartOption);
    		        var allotSubmitRatechart1 = echarts.init(document.getElementById('allotSubmitRate1'));
					allotSubmitRatechartOption.title.text = "拨打提交率 \n\n  "+ym;
					allotSubmitRatechartOption.series[0]["data"][1]["value"] = item[5];
					allotSubmitRatechartOption.series[0]["data"][1]["name"] = "拨打提交率";
					allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["normal"]["color"] = '#c573ff';
					allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["emphasis"]["textStyle"]["color"] = '#c573ff';
					allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["normal"]["label"]["textStyle"]["color"] = '#c573ff';
					allotSubmitRatechartOption.series[0]["data"][0]["value"] = 100 - item[5];
    		        allotSubmitRatechart1.setOption(allotSubmitRatechartOption);
				}
			});
			var teamContrastDetailchart = echarts.init(document.getElementById('teamContrastDetail'));
			teamDataContrastOption.xAxis[0].data = xAixD;
			teamDataContrastOption.series[0].data = allot;
			teamDataContrastOption.series[1].data = dial;
			teamDataContrastOption.series[2].data = submit;
			teamDataContrastOption.series[3].data = allotR;
			teamDataContrastOption.series[4].data = dialR;
	        teamContrastDetailchart.setOption(teamDataContrastOption);
	        $.closeLoading();
    	}
    };
    changeOrder = function(){
    	$.createLoading();
    	var id = $(this).attr("id");
    	if(id==='distributeRate'){
    		var orderBy = $(this).find("option:selected").val(),
    		order = $(this).siblings("#teamOrder").find("option:selected").val();
    	}else{
    		var orderBy = $(this).siblings("#distributeRate").find("option:selected").val(),
    		order = $(this).find("option:selected").val();
    	}
    	topHalf(orderBy,order);
    	$.closeLoading();
    };
    changeTeam = function(){
    	$.createLoading();
    	var self = $(this);
    	var t = $(this).next().find(".filter-option").text().trim(),
    		selArr = t.split(", "),
    		forT = self.siblings("#alternative").find("option:selected").text().trim(),
    		index = self.siblings("#alternative").find("option:selected").attr("data-id"),
    		contrastData = [],
    		seriesD = [],
    		serdA = [],
    		serd = [],
    		nowSel = [];
    	group = group.sort(function(a,b){
    		return a[0].split(":")[0] - b[0].split(":")[0];
    	});
    	var serNm = [];
		$.each(selArr,function(ind,item){
			if(item){
				serNm.push({
    				 name: item,
    				 type: 'line',
    				 data:[]
    			});
			}
    	});
    	if(serNm.length){
    		$.each(serNm,function(ind,item){
        		var len = item.data.length;
        		if(!len){
        			item.data = [];
        			var indexs = index*1 + 1;
        			if(item.name==="团队总计"){
        				$.each(sumData,function(ind,im){
            				item.data.push(im[index]);
            			});
        			}else{
        				$.each(group,function(ind,im){
            				if(item.name===im[1]){
            					item.data.push(im[indexs]);
                			}	
            			});
        			}
        			len = item.data.length;
        			if(len===0){
        				for(var i=0;i<17;i++){
        					item.data.push(0);
        				}
        			}
        			if(len<17&&len>0){
    					$.each(arr, function(ind,ite){
    						if(timeArr.indexOf(ite)<0){
    							item.data.splice(ind,0,0);
    						}
    					});
    				}
        		}
        	});
    	}
		var trendDetailchart = echarts.init(document.getElementById('trendDetail'));
		teamDS.unshift('团队总计');
	    trendContrastOption.color = ["#a887fa", "#87fa95", "#8cd9f5", "#cd87fa", "#757bfc", "#d2f3ec", "#85c079", "#58cced", "#2fdaff", "#a1abe7", "#fa9287", "#87b0fa", "#f7de37", "#fca419", "#f5d463", "#e9ad3a"];
	    trendContrastOption.legend.data = teamDS;
	    trendContrastOption.series = serNm;
	    if(serNm.length>0){
	    	trendContrastOption.xAxis[0].data = arr;
	    	trendContrastOption.xAxis[0].splitLine = {
	    			show: true
	    	}
	    	trendContrastOption.xAxis[0].axisTick = { 
	    			lineStyle: {
	                    color: '#fff',
	                    shadowColor: '#00f',
	                    shadowOffsetX: 26
	                }
	    	}
	    }else{
	    	trendContrastOption.xAxis[0].data = [];
	    	trendContrastOption.xAxis[0].splitLine = {
	    			show: false
	    	}
	    	trendContrastOption.xAxis[0].axisTick = { show: false }
	    }
	    trendContrastOption.tooltip.formatter = function(data){
        	if(data.length){
        		var tmp = data[0].name + forT + '<br>';
        		$.each(data, function(ind,item){
        			if(forT.substring(forT.length-1) === "率"){
        				tmp+=item.seriesName + " : " + item.value + "%<br>"
        			}else{
        				tmp+=item.seriesName + " : " + item.value + "<br>"
        			}
        		});
        		return tmp;
        	}
        }
	    trendDetailchart.setOption(trendContrastOption);
	    $.closeLoading();
    };
    changeQuota = function(){
    	$.createLoading();
    	var seriesD = trendContrastOption.series,
    		t = $(this).find("option:selected").text().trim(),
    		index = $(this).find("option:selected").attr("data-id"),
    		selT = $(this).siblings("#teamSel").next().find(".filter-option").text().trim(),
    		selArr = selT.split(", ");
    	group = group.sort(function(a,b){
    		return a[0].split(":")[0] - b[0].split(":")[0];
    	});
    	if(selArr[0]==="团队总计"){
			$.each(seriesD, function(id,im){
				if(im){
					if(im.name==="团队总计"){
						im.data = [];
						$.each(sumData, function(ind,item){
							im['data'].push(item[index]);
						});
						var len = im.data.length;
						if(len===0){
	        				for(var i=0;i<17;i++){
	        					im.data.push(0);
	        				}
	        			}
						if(len<17&&len>0){
	    					$.each(arr, function(ind,ite){
	    						if(timeArr.indexOf(ite)<0){
	    							im.data.splice(ind,0,0);
	    						}
	    					});
	    				}
    				}
				}
			});
    		selArr.shift();
    	}
    	if(selArr.length){
    		var ids = index*1+1;
    		$.each(seriesD, function(id,im){
    			if(im){
    				if(im.name !== "团队总计"){
    					im.data = [];
    					$.each(group, function(ind,item){
        					if(im.name===item[1]){
        						im['data'].push(item[ids]);
            				}
                		});
        				var len = im.data.length;
        				if(len===0){
            				for(var i=0;i<17;i++){
            					im.data.push(0);
            				}
            			}
    					if(len<17&&len>0){
        					$.each(arr, function(ind,ite){
        						if(timeArr.indexOf(ite)<0){
        							im.data.splice(ind,0,0);
        						}
        					});
        				}
    				}
    			}
			});
    	}
    	var trendDetailchart = echarts.init(document.getElementById('trendDetail'));
    	if(seriesD.length>0){
	    	trendContrastOption.xAxis[0].data = arr;
	    	trendContrastOption.xAxis[0].splitLine = {
	    			show: true
	    	}
	    	trendContrastOption.xAxis[0].axisTick = { 
	    			lineStyle: {
	                    color: '#fff',
	                    shadowColor: '#00f',
	                    shadowOffsetX: 26
	                }
	    	}
	    }else{
	    	trendContrastOption.xAxis[0].data = [];
	    	trendContrastOption.xAxis[0].splitLine = {
	    			show: false
	    	}
	    	trendContrastOption.xAxis[0].axisTick = { show: false }
	    }
    	trendContrastOption.tooltip.formatter = function(data){
        	if(data.length){
        		var tmp = data[0].name + t + '<br>';
        		$.each(data, function(ind,item){
        			if(t.substring(t.length-1) === "率"){
        				tmp+=item.seriesName + " : " + item.value + "%<br>"
        			}else{
        				tmp+=item.seriesName + " : " + item.value + "<br>"
        			}
        		});
        		return tmp;
        	}
        }
	    trendContrastOption.series = seriesD;
    	trendDetailchart.setOption(trendContrastOption);
    	$.closeLoading();
    };
    changeDGS = function(){
    	$.createLoading();
    	var val = $("#detailDate").val().trim(),
			orderBy = $("#distributeRate").find("option:selected").val().trim(),
			order = $("#teamOrder").find("option:selected").val().trim();
    	topHalf(orderBy,order);
    	$.ajax({
    		url:getPath()+'/pm/twentyFourSubmissionRate/getRate.koala',
    		type:'post',
    		data:{
    			date:val,
    			type:'sum'
    		},
    		dataType:'json',
    		success:function(data){
    			var data = data.data;
    			if(data){
    				sumData = data;
    				sumData.map(function(item,ind){
    					if(item[0]==="23:59"){
    						item[0]="24:00"
    					}
    					return item;
    				});
    				var nowT;
    				$("#scheduleDetail div").each(function(){
    					var t = $(this).find("span").text().trim();
    					if($(this).find("span").hasClass("active")){
    						nowT = t;
    					}
    				});
    				var ym = $("#detailDate").val().trim().split("-");
    				ym.pop();
    				ym = ym.join("-");
    				$.each(sumData,function(ind,item){
    					if(item[0]===nowT){
    						$("#allot").text(item[1]);
    						$("#dial").text(item[2]);
    						$("#submit").text(item[3]);
    						var allotSubmitRatechart = echarts.init(document.getElementById('allotSubmitRate'));
    						allotSubmitRatechartOption.title.text = "分配提交率 \n\n  "+ym;
    						allotSubmitRatechartOption.series[0]["data"][1]["value"] = item[4];
    						allotSubmitRatechartOption.series[0]["data"][1]["name"] = "分配提交率";
    						allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["normal"]["color"] = '#6c73fd';
    						allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["emphasis"]["textStyle"]["color"] = '#6c73fd';
    						allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["normal"]["label"]["textStyle"]["color"] = '#6c73fd';
    						allotSubmitRatechartOption.series[0]["data"][0]["value"] = 100 - item[4];
    	    		        allotSubmitRatechart.setOption(allotSubmitRatechartOption);
    	    		        var allotSubmitRatechart1 = echarts.init(document.getElementById('allotSubmitRate1'));
    						allotSubmitRatechartOption.title.text = "拨打提交率 \n\n  "+ym;
    						allotSubmitRatechartOption.series[0]["data"][1]["value"] = item[5];
    						allotSubmitRatechartOption.series[0]["data"][1]["name"] = "拨打提交率";
    						allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["normal"]["color"] = '#c573ff';
    						allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["emphasis"]["textStyle"]["color"] = '#c573ff';
    						allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["normal"]["label"]["textStyle"]["color"] = '#c573ff';
    						allotSubmitRatechartOption.series[0]["data"][0]["value"] = 100 - item[5];
    	    		        allotSubmitRatechart1.setOption(allotSubmitRatechartOption);
    					}
    				});
    				var index = $("#alternative").find("option:selected").attr("data-id").trim(),
    					t = $("#alternative").find("option:selected").text().trim(),
    					selArr = $("#teamSel").next().find(".filter-option").text().trim().split(", "),
    					seriesD = [];
    				if(selArr.length){
    					$.each(selArr, function(ind,item){
    						if(item){
    							seriesD.push({
		    						name:item,
		    						type:"line",
		    						data:[]
		    					});
    						}
	    				});
    				}
    				if(selArr[0]==="团队总计"){
    					$.each(sumData, function(ind,item){
    						seriesD[0].data.push(item[index]);
    					});
    					var len = seriesD[0].data.length;
    					if(len===0){
            				for(var i=0;i<17;i++){
            					seriesD[0].data.push(0);
            				}
            			}
    					if(len<17&&len>0){
        					$.each(arr, function(ind,ite){
        						if(timeArr.indexOf(ite)<0){
        							seriesD[0].data.splice(ind,0,0);
        						}
        					});
        				}
    					selArr.shift();
    				}
    				if(selArr.length){
    					var indexs = index*1 + 1;
    					$.each(seriesD, function(id,itm){
    						$.each(group, function(ind,item){
        						if(itm.name === item[1]){
        							itm.data.push(item[indexs]);
        						}
        					});
    						var len = itm.data.length;
    						if(len===0){
    	        				for(var i=0;i<17;i++){
    	        					itm.data.push(0);
    	        				}
    	        			}
    						if(len<17&&len>0){
            					$.each(arr, function(ind,ite){
            						if(timeArr.indexOf(ite)<0){
            							itm.data.splice(ind,0,0);
            						}
            					});
            				}
    					});
    				}
    				var trendDetailchart = echarts.init(document.getElementById('trendDetail'));
    		    	trendContrastOption.tooltip.formatter = function(data){
    		        	if(data.length){
    		        		var tmp = data[0].name + t + '<br>';
    		        		$.each(data, function(ind,item){
    		        			if(t.substring(t.length-1) === "率"){
    		        				tmp+=item.seriesName + " : " + item.value + "%<br>"
    		        			}else{
    		        				tmp+=item.seriesName + " : " + item.value + "<br>"
    		        			}
    		        		});
    		        		return tmp;
    		        	}
    		        }
    				if(seriesD.length>0){
    			    	trendContrastOption.xAxis[0].data = arr;
    			    	trendContrastOption.xAxis[0].splitLine = {
    			    			show: true
    			    	}
    			    	trendContrastOption.xAxis[0].axisTick = { 
    			    			lineStyle: {
    			                    color: '#fff',
    			                    shadowColor: '#00f',
    			                    shadowOffsetX: 26
    			                }
    			    	}
    			    }else{
    			    	trendContrastOption.xAxis[0].data = [];
    			    	trendContrastOption.xAxis[0].splitLine = {
    			    			show: false
    			    	}
    			    	trendContrastOption.xAxis[0].axisTick = { show: false }
    			    }
    				trendContrastOption.series = seriesD;
    				trendDetailchart.setOption(trendContrastOption);
    			}
    			$.closeLoading();
    		}
    	});
    };
    topHalf = function(orderBy,order){
    	var date = $("#detailDate").val().trim();
    	$.ajax({
    		url:getPath()+'/pm/twentyFourSubmissionRate/getRate.koala',
    		type:'post',
    		async:false,
    		data:{
    			date: date,
    			orderBy: orderBy,
    			order: order,
    			type: 'group'
    		},
    		dataType:'json',
    		success:function(data){
    			var data = data.data;
    			if(data){
    				group = data;
    				group.map(function(item,ind){
    					if(item[0]==="23:59"){
    						item[0]="24:00"
    					}
    					return item;
    				});
    				var seriesD = [],
    					nowT, 
    					xAixD = [],
    					allot = [],
    					dial = [],
    					submit = [],
    					allotR = [],
    					dialR = [];
    				timeArr = [];
    				$.each(group, function(ind,item){
    					if(timeArr.indexOf(item[0])<0){
    						timeArr.push(item[0]);
    					}
    				});
    				timeArr = timeArr.sort(function(a,b){
    		    		return a.split(":")[0] - b.split(":")[0];
    		    	});
					$("#scheduleDetail div").each(function(){
						var t = $(this).find("span").text().trim(),
							self = $(this);
						self.removeClass("optional");
    					if(!t){
    						if($(this).prev().hasClass("optional")){
    							$(this).addClass("optional");
    						}
    					}else{
    						$.each(timeArr, function(ind,item){
        						if(item === t){
        							self.addClass("optional");
        						}
    						});
    					}
    					$(this).find("span").removeClass("active");
    					if(t===timeArr[timeArr.length-1]){
    						$(this).find("span").addClass("active");
    					}
    				});
    				$("#scheduleDetail div").each(function(){
    					var t = $(this).find("span").text().trim();
    					if($(this).find("span").hasClass("active")){
    						nowT = t;
    					}
    				});
    				$.each(data,function(ind,item){
    					if(item[0]===nowT){
    						xAixD.push(item[1]);
    						allot.push(item[2]);
    						dial.push(item[3]);
    						submit.push(item[4]);
    						allotR.push(item[5]);
    						dialR.push(item[6]);
    					}
    				});
    				var teamContrastDetailchart = echarts.init(document.getElementById('teamContrastDetail'));
    				teamDataContrastOption.xAxis[0].data = xAixD;
    				teamDataContrastOption.series[0].data = allot;
    				teamDataContrastOption.series[1].data = dial;
    				teamDataContrastOption.series[2].data = submit;
    				teamDataContrastOption.series[3].data = allotR;
    				teamDataContrastOption.series[4].data = dialR;
			        teamContrastDetailchart.setOption(teamDataContrastOption);
			        group = group.sort(function(a,b){
    		    		return a[0].split(":")[0] - b[0].split(":")[0];
    		    	});
			       
    			}
    		}
    	});
    };
    upperHalf = function(){
    	var date = $("#detailDate").val().trim();
    	$.ajax({
    		url:getPath()+'/pm/twentyFourSubmissionRate/getRate.koala',
    		type:'post',
    		async: false,
    		data:{
    			date:date,
    			type:'sum'
    		},
    		dataType:'json',
    		success:function(data){
    			var data = data.data;
    			if(data){
    				sumData = data;
    				sumData.map(function(item,ind){
    					if(item[0]==="23:59"){
    						item[0]="24:00"
    					}
    					return item;
    				});
    				var contrastData = [],
    					seriesD = [],
    					nowT;
    				timeArr = [];
    				$.each(sumData,function(ind,item){
    					contrastData.push(item[4]);
    					timeArr.push(item[0]);
    				});
    				timeArr = timeArr.sort(function(a,b){
    		    		return a.split(":")[0] - b.split(":")[0];
    		    	});
    				$.each(timeArr, function(ind,item){
    					$("#scheduleDetail div").each(function(){
        					var t = $(this).find("span").text().trim();
        					$(this).find("span").removeClass("active");
        					if(t===timeArr[timeArr.length-1]){
        						$(this).find("span").addClass("active");
        					}
        					if(!t){
        						if($(this).prev().hasClass("optional")){
        							$(this).addClass("optional");
        						}
        					}else{
        						if(item === t){
        							$(this).addClass("optional");
        						}
        					}
        				});
    				});
    				$("#scheduleDetail div").each(function(){
    					var t = $(this).find("span").text().trim();
    					if($(this).find("span").hasClass("active")){
    						nowT = t;
    					}
    				});
    				var ym = $("#detailDate").val().trim().split("-");
    				ym.pop();
    				ym = ym.join("-");
    				$.each(sumData,function(ind,item){
    					if(item[0]===nowT){
    						$("#allot").text(item[1]);
    						$("#dial").text(item[2]);
    						$("#submit").text(item[3]);
    						var allotSubmitRatechart = echarts.init(document.getElementById('allotSubmitRate'));
    						allotSubmitRatechartOption.title.text = "分配提交率 \n\n  "+ym;
    						allotSubmitRatechartOption.series[0]["data"][1]["value"] = item[4];
    						allotSubmitRatechartOption.series[0]["data"][1]["name"] = "分配提交率";
    						allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["normal"]["color"] = '#6c73fd';
    						allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["emphasis"]["textStyle"]["color"] = '#6c73fd';
    						allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["normal"]["label"]["textStyle"]["color"] = '#6c73fd';
    						allotSubmitRatechartOption.series[0]["data"][0]["value"] = 100 - item[4];
    	    		        allotSubmitRatechart.setOption(allotSubmitRatechartOption);
    	    		        var allotSubmitRatechart1 = echarts.init(document.getElementById('allotSubmitRate1'));
    						allotSubmitRatechartOption.title.text = "拨打提交率 \n\n  "+ym;
    						allotSubmitRatechartOption.series[0]["data"][1]["value"] = item[5];
    						allotSubmitRatechartOption.series[0]["data"][1]["name"] = "拨打提交率";
    						allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["normal"]["color"] = '#c573ff';
    						allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["emphasis"]["textStyle"]["color"] = '#c573ff';
    						allotSubmitRatechartOption.series[0]["data"][1]["itemStyle"]["normal"]["label"]["textStyle"]["color"] = '#c573ff';
    						allotSubmitRatechartOption.series[0]["data"][0]["value"] = 100 - item[5];
    	    		        allotSubmitRatechart1.setOption(allotSubmitRatechartOption);
    					}
    				});
    				$("#detailDate,#addDown").change(function(){
    					$.each(timeArr, function(ind,item){
        					$("#scheduleDetail div").each(function(){
            					var t = $(this).find("span").text().trim();
            					if(!t){
            						if($(this).prev().hasClass("optional")){
            							$(this).addClass("optional");
            						}
            					}else{
            						if(item === t){
            							$(this).addClass("optional");
            						}
            					}
            				});
        				});
    				});
    				if(contrastData.length<17){
    					$.each(arr, function(ind,item){
    						if(timeArr.indexOf(item)<0){
    							contrastData.splice(ind,0,0);
    						}
    					});
    				}
    				seriesD.push({
			        	name: "团队总计",
			            type: 'line',
			            data: contrastData
			        });
    				var trendDetailchart = echarts.init(document.getElementById('trendDetail'));
    				teamDS.unshift('团队总计');
			        trendContrastOption.color = ["#a887fa", "#87fa95", "#8cd9f5", "#cd87fa", "#757bfc", "#d2f3ec", "#85c079", "#58cced", "#2fdaff", "#a1abe7", "#fa9287", "#87b0fa", "#f7de37", "#fca419", "#f5d463", "#e9ad3a"];
			        trendContrastOption.legend.data = teamDS;
			        trendContrastOption.series = seriesD;
				    trendContrastOption.xAxis[0].data = arr;
				    trendContrastOption.tooltip.formatter = function(data){
			        	if(data.length){
			        		var tmp = data[0].name + ' 分配提交率<br>';
			        		$.each(data, function(ind,item){
			        			tmp+=item.seriesName + " : " + item.value + "%<br>"
			        		});
			        		return tmp;
			        	}
			        }
			        trendDetailchart.setOption(trendContrastOption);
			        $.closeLoading();
    			}
    		}
    	});
    };
    init = function () {
    	$.createLoading();
        dateInit();
        initSelect();
        initTimeASel();
        upperHalf();
        topHalf('rs001','desc');
        var time,
        	T = new Date(serveTime),
        	y = T.getFullYear(),
        	m = T.getMonth(),
        	d = T.getDate(),
        	h = T.getHours()+1;
        time = new Date(y,m,d,h,5,0)*1 - new Date(serveTime)*1;
        var timer = setInterval(function(){
            initTimeASel();
            changeDGS();
            T = new Date(serveTime);
        	y = T.getFullYear();
        	m = T.getMonth();
        	d = T.getDate();
        	h = T.getHours()+1;
            time = new Date(y,m,d,h,5,0)*1 - new Date(serveTime)*1;
            clearInterval(timer);
            setInterval(function(){
                initTimeASel();
                changeDGS();
            },time);
        },time);
        $("#scheduleDetail").on("click","span",changeDT);
        $("#distributeRate").on("change",changeOrder);
        $("#teamOrder").on("change",changeOrder);
        $("#teamSel").on("change",changeTeam);
        $("#alternative").on("change",changeQuota);
        $("#detailDate").on("change",changeDGS);
    };
    init();
});
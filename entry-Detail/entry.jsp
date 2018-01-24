<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
    <%
	String contextPath = request.getContextPath();
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>进件明细</title>
    <link rel="stylesheet" type="text/css" href="<%=contextPath%>/lib/bootstrap/bootstrap-select.css">
    <link rel="stylesheet" type="text/css" href="<%=contextPath%>/lib/bootstrap/bootstrap-table.css">
    <link rel="stylesheet" type="text/css" href="<%=contextPath%>/css/radio-checkbx.css">
    <link rel="stylesheet" type="text/css" href="<%=contextPath%>/lib/bootstrap/bootstrap-multiselect.css">
    <link rel="stylesheet" type="text/css" href="<%=contextPath%>/lib/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css">
    <link rel="stylesheet" type="text/css" href="<%=contextPath %>/pages/entry-Detail/css/entryDetails.css">
</head>
<body>
    <div id="entry_details">
        <div class="simple-breadcrumb">
        	<span>报表中心</span> &gt;
            <span>自营业务</span> &gt;
            <span>进件成交报表</span> &gt;
            <span class="font-blue">进件明细</span>
        </div>
        <div id="entry_details_top">
            <div id="choice_sel" class="choice_sel">
                <!-- 合同选择 -->
                <div class="contract_choice" id="contractChoice">
                    <div class="contract_title contractT" id=""><span class="title_icon" ></span>合同选择</div>
                    
                    	<div class="row">
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">申请编号 </label>
	                            <input type="text" class="sel_length sxbh empty" placeholder="请输入申请编号" name="applyNo"/>
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">申请状态</label>
	                            <select name="applySts" class="selectpicker show-tick dropdown mult apply_status" id="applyStatus" multiple data-live-search="true">
	                            	
	                            </select>
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">申请日期 </label>
	                            <input type="text" placeholder="起始日期" id="applyDS" data-class="applyDt" class="Wdate form-control" data-id="1" name="strApplyDt" data-date-format="yyyy-mm-dd">-<input type="text" placeholder="结束日期" id="appDE" data-class="applyDt" class="Wdate form-control" data-id="2" name="endApplyDt" data-date-format="yyyy-mm-dd">
	                        </div>
	                    </div>
	                    <div class="row">
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">GPS卡号</label>
	                            <input type="text" name="gpsNum1" class="sel_length sxbh" placeholder="请输入GPS卡号" />
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">发动机号</label>
	                            <input type="text" name="carMotorNo" class="sel_length sxbh" placeholder="请输入发动机号" />
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">合同生效日期</label>
	                            <input type="text" placeholder="起始日期" id="pactDS" data-class="contrEffectDt" data-id="1" name="strEffDt" class="Wdate form-control" data-date-format="yyyy-mm-dd">-<input type="text" placeholder="结束日期" id="pactDE" data-class="contrEffectDt" data-id="2" name="endEffDt" class="Wdate form-control" data-date-format="yyyy-mm-dd">
	                        </div>
	                    </div>
	                    <div class="row">
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">客户名称 </label>
	                            <input type="text" name="custName" class="sel_length sxbh empty" placeholder="请输入客户名称" />
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">店面省份 </label>
	                            <select name="storeProvince" class="selectpicker mult storefront_prov" id="storeProv"  multiple data-live-search="true">
	                                
	                            </select>
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">合同取消日期 </label>
	                            <input type="text" placeholder="起始日期" id="cancelDS" data-class="contrCancelDt" name="strEffDt" class="Wdate empty form-control" name="strCancel" data-id="1" data-date-format="yyyy-mm-dd">-<input type="text" placeholder="结束日期" id="cancelDE" data-class="contrCancelDt" class="Wdate empty form-control" name="endCancel" data-id="2" data-date-format="yyyy-mm-dd">
	                          </div>
	                    </div>
	                    <div class="row">
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">车架号</label>
	                            <input type="text" name="vinNo" class="sel_length sxbh empty" placeholder="请输入车架号" />
	                        </div>
	                    </div>
                    
                    </div>
                <!-- 业务部门  -->
                <div class="busi_department" id="busiDepartment">
                    <div class="contract_title"><span class="title_icon" ></span>业务部门</div>
                    
                    	<div class="row">
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">所属公司 </label>
	                            <select name="blngsComp" class="selectpicker" id="belong" data-live-search="true">
	                                
	                            </select>
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">大区 </label>
	                            <select name="regionName" class="selectpicker" id="region" data-live-search="true">
	                                
	                            </select>
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">片区</label>
	                            <select name="areaName" class="selectpicker" id="belong_department" data-live-search="true">
	                               
	                            </select>
	                        </div>
	                    </div>
	                    <div class="row">
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">分公司 </label>
	                            <select name="branchCompany" class="selectpicker" id="sub_company" data-live-search="true">
	                                
	                            </select>
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">业务类型</label>
	                            <select name="serviceType" class="selectpicker business_type mult" id="serviceType" multiple data-live-search="true">
	                                
	                            </select>
	                        </div>
	                         <div class="col-xs-4">
	                            <label class="label_key font_pos">租赁属性</label>
	                            <select name="rentType" class="selectpicker mult lease_attr" id="rentProp" data-live-search="true">
	                                
	                            </select>
	                        </div>
	                    </div>
	                    <div class="row">
	                
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">项目类型 </label>
	                            <select name="prjcType" class="selectpicker" id="project_type" data-live-search="true">
	                                
	                            </select>
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">所属项目</label>
	                            <select name="blngsPrjc" class="selectpicker" id="belong_project" multiple data-live-search="true">
	                                
	                            </select>
	                        </div>
	                    </div>
                    
                    
                </div>
                <!-- 渠道选择   -->
                <div class="channel_choice" id="channelChoice">
                    <div class="contract_title"><span class="title_icon" ></span>渠道选择</div>
                    
                    	<div class="row">
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">店面名称 </label>
	                            <input type="text" name="quoteStoreName" class="sel_length sxbh" placeholder="请输入店面名称" />
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">客户渠道一级科目</label>
	                            <select name="customerChannelOne" class="selectpicker mult customer_channel1" id="channelFirst" data-live-search="true">
	                                
	                            </select>
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">客户渠道二级科目</label>
	                            <select name="customerChannel" class="selectpicker mult customer_channel2" id="channelSec" multiple data-live-search="true">
	                                
	                            </select>
	                        </div>
	                    </div>
	                    <div class="row">
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">合作渠道一级科目</label>
	                            <select name="cooperatChannel" class="selectpicker mult cooperate_channel1" id="cooperateFir" data-live-search="true">
	                               
	                            </select>
	                        </div>
	                    </div>
                    
                    
                </div>
                <!-- 车型选择   -->
                <div class="car_choice" id="carChoice">
                    <div class="contract_title"><span class="title_icon" ></span>车型选择</div>
                    
                    	<div class="row">
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">品牌</label>
	                            <select name="brand" class="selectpicker" id="brand" data-live-search="true">
	                                
	                            </select>
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">车辆制造商</label>
	                            <select name="manufacId" class="selectpicker" id="vehicle_manufacturer" data-live-search="true">
	                                
	                            </select>
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">车型</label>
	                            <select name="models" class="selectpicker" id="car_models" data-live-search="true">
	                                
	                            </select>
	                        </div>
	                    </div>
	                    <div class="row">
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">车辆类型</label>
	                            <select name="carType" class="selectpicker mult car_type" id="carType" multiple data-live-search="true">
	                               
	                            </select>
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">特殊车型</label>
	                            <select name="specModels" class="selectpicker mult special_models" id="specialType" data-live-search="true">
	                                
	                            </select>
	                        </div>
	                    </div>
                   
                    
                </div>
                <!-- 产品选择   -->
                <div class="product_choice" id="productChoice">
                    <div class="contract_title"><span class="title_icon"></span>产品选择</div>
                   
                    	<div class="row">
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">产品编号</label>
	                            <input type="text" name="productNo" class="sel_length sxbh" placeholder="请输入产品编号" />
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">产品方案名称</label>
	                            <input type="text" name="productName" class="sel_length sxbh" placeholder="请输入产品方案名称" />
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">GPS价格类型</label>
	                            <input type="text" name="gpsPriceType" class="sel_length sxbh" placeholder="请输入GPS价格类型" />
	                        </div>
	                    </div>
                
                </div>
                <!-- 融资信息   -->
                <div class="financing_choice" id="financingChoice">
                    <div class="contract_title"><span class="title_icon" ></span>融资信息</div>
                    
                    	<div class="row">
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">融资期限</label>
	                            <select name="financePeriod" class="selectpicker mult financing_maturity" id="finceLim" multiple data-live-search="true">
	                                
	                            </select>
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">是否融保险</label>
	                            <select name="isRisk" class="selectpicker mult insurance_yesorno" id="IsFince" data-live-search="true">
	                                
	                            </select>
	                        </div>
	                        <div class="col-xs-4">
	                            <label class="label_key font_pos">融资额</label>
	                            <input type="text" id="amountSt" class="sqrq financing inputNumber" data-id="1" name="strfancAmt" placeholder="融资额"/>元 -<input type="text" id="amountEnd" class="sqrq financing inputNumber" data-id="2" name="endfancAmt" placeholder="融资额"/>元
	                        </div>
	                    </div>
               
                </div>
            </div>
            <!--已选条件-->
            <div class="selected_choice" id="selectedChoice">
                <div class="contract_title contractTs"><span class="title_icon" ></span>已选条件</div>
                <div class="template">
                    <div class="enter_template" id="enterTemplate">
                        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" >
                            <span class="entry"></span>生成模板
                        </button>
                    </div>
                    <div class="generation_template" id="generationTemplate">
                        

                    </div>
                </div>
                <div class="select_template" id="selectTemplate">
                    <section>
                        <div class="sel_tit">
                            <label>合同选择</label>
                        </div>
                        <div class="sel_det">
                        </div>
                    </section>
                    <section>
                        <div class="sel_tit">
                            <label>业务部门</label>
                        </div>
                        <div class="sel_det">

                        </div>
                    </section>
                    <section>
                        <div class="sel_tit">
                            <label>渠道选择</label>
                        </div>
                        <div class="sel_det"></div>
                    </section>
                    <section>
                        <div class="sel_tit">
                            <label>车型选择</label>
                        </div>
                         <div class="sel_det"></div>
                    </section>
                    <section>
                        <div class="sel_tit">
                            <label>产品选择</label>
                        </div>
                        <div class="sel_det"></div>
                    </section>
                    <section>
                        <div class="sel_tit">
                            <label>融资信息</label>
                        </div>
                        <div class="sel_det"></div>
                    </section>
                    <div class="modal fade" id="myModalLabel" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content modal-buildM">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title">生成模板</h4>
                                </div>
                                <div class="modal-body">
                                   	<span class="modal-name">请输入模板名称</span> 
                                   	<input type="text" placeholder="8个字以内" id="templateName" maxlength="8">
                               
                                </div>
                                 <div class="modal-footer">
                                    <button type="button" class="btn btn-info" style="background:#1D86F4" id="preserve">保存</button>
                                    <button type="button" class="btn btn-default" data-dismiss="modal" id="cancel">取消</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade"id="myModalFail" tabindex="-1" role="dialog" aria-labelledby="myModalFail">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content modal-buildM">
                                <div class="modal-body">
                                    	抱歉，您最多可保存5个模板，当前已达上限，该模板未保存成功
                                </div>
                                <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal" id="ensure">确定</button>
                                 </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="myModalExit" tabindex="-1" role="dialog" aria-labelledby="myModalExit">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content modal-buildM">
                                <div class="modal-body">
                                	   您输入的模板名称已存在，请您重新输入！
                                </div>
                                 <div class="modal-footer">
                                        <button type="button" class="btn btn-default" data-dismiss="modal" id="ensure_">确定</button>
                                  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="show_more">
                <span id="show_more_btn" data-rel="1">更多</span>
                <img id="show_more_img" src="<%=contextPath%>/pages/carCustomerPortrait/img/down.png" alt="" />
            </div>
            <div class="row query_reset">
                <button type="button" id="query" class="btn btn-info btn_primary_solo" style="background:#1D86F4">查询</button>
                <button type="button" id="reset" class="btn btn-info-base btn-info-solo">重置</button>
            </div>
        </div>
        <!--导出部分-->
        <div id="entry_details_bottom">
            <div class="export" id="export">
                <button id="exportBtn" type="button" class="btn btn-primary btn-lg"  style="background:#1D86F4">
                    <img src="<%=contextPath %>/pages/entry-Detail/img/export.png" alt="">导出
                </button>
                <!--导出模态框-->
                <div class="modal fade" id="myExportModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="" role="document">
                        <div class="modal-content modal-export">
                            <div class="modal-header">
                                <button type="button" class="close" id="close" ><span>&times;</span></button>
                                <h4 class="modal-title" id="myModalLabel">导出下载</h4>
                            </div>
                            <div class="modal-body">
                                <div class="page_choice" id="pageChoice">
                                    <p><font color="red">*</font>页码选择
                                        <span>
                                            <img src="<%=contextPath%>/pages/carCustomerPortrait/img/change.png" alt="" id="currentPage">
                                            <label for="currentPage">当前页</label>
                                        </span>
                                        <span>
                                            <img src="<%=contextPath%>/pages/carCustomerPortrait/img/before_change.png" alt="" id="allPage">
                                            <label for="allPage">所有页</label>
                                        </span>
                                        <span>
                                            <img src="<%=contextPath%>/pages/carCustomerPortrait/img/before_change.png" alt="" id="custom">
                                            <label for="custom">自定义</label>
                                        </span>
                                        <span>
                                            	<b>页码</b> <input type="text" class="inputNumber" id="startPg"/><b>-</b><input type="text" class="inputNumber" id="endPg"/>
                                        </span>
                                    </p>
                                </div>
                                <div class="from_choice" id="fromChoice">
                                    <div class="left-tit">
                                      	  表头选择
                                    </div>
                                    <div class="right-sel">
                                        <div id="selAll">
                                            <span><img src="<%=contextPath%>/pages/carCustomerPortrait/img/before_check.png" alt=""><b>全选</b></span>
                                        </div>
                                        <div class="initial_choice" id="initialChoice">
                                            <span class="active">A</span>
                                            <span>B</span>
                                            <span>C</span>
                                            <span>D</span>
                                            <span>E</span>
                                            <span>F</span>
                                            <span>G</span>
                                            <span>H</span>
                                            <span>I</span>
                                            <span>J</span>
                                            <span>K</span>
                                            <span>L</span>
                                            <span>M</span>
                                            <span>N</span>
                                            <span>O</span>
                                            <span>P</span>
                                            <span>Q</span>
                                            <span>R</span>
                                            <span>S</span>
                                            <span>T</span>
                                            <span>U</span>
                                            <span>V</span>
                                            <span>W</span>
                                            <span>X</span>
                                            <span>Y</span>
                                            <span>Z</span>
                                        </div>
                                        <div class="tit-sel" id="titSel">
                                        </div>
                                        <div class="sel_result" id="selResult">
                                            <div class="contract_title"><span class="title_icon" ></span><b>选中结果</b></div>
                                            <div class="sel_detail" id="selDetail">
                                                   
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button id="exportBtnEnsure" type="button" class="btn btn-info" style="background:#1D86F4"  style="background:#1D86F4">
                                    	导出</button>
                                <button type="button" class="btn btn-default" id="exportCancel">重置</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           <!--导出成功-->
            <div class="download hide download-success" id="downloadSuccess">
             	<span class="right-cirle"><i></i></span><span>已成功下载至本地</span>
            </div>	
            <!-- 导出失败 -->
            <div class="download hide download-fail" id="downloadFail">
             	<span class="right-cirle">&times;</span><span>抱歉，下载请求失败，<br>请稍后再试~</span>
            </div> 	
            <div class="modal fade " id="myModalWarn" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content modal-buildM">
                                <div class="modal-body">
                                   	<div class="content">
                                   	
                                   	</div>
                                </div>
                                <div class="modal-footer">
	                                 <button type="button" class="btn btn-info" style="background:#1D86F4" id="konwE">确定</button>
	                            </div>
                            </div>
                        </div>
                    </div>
            
            <!--表格-->
            
            <div class="table-controller" id="carType_table">
                <table id="entry_table" class="table table-bordered">
                    
                </table>
            </div>

        </div>
    </div>
    <script src="<%=contextPath%>/lib/jquery.min.js" type="text/javascript"></script>
    <script src="<%=contextPath%>/lib/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
    <script src="<%=contextPath%>/lib/bootstrap/bootstrap-select.js"></script>
    <script src="<%=contextPath%>/lib/bootstrap/bootstrap-table.js"></script>
    <script src="<%=contextPath%>/js/common-m.js"></script>
    <script src="<%=contextPath%>/lib/bootstrap/bootstrap-multiselect.js"></script>
    <script src="<%=contextPath %>/lib/bootstrap-datetimepicker/js/bootstrap-datetimepicker.js"></script>
    <script src="<%=contextPath %>/lib/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>
    <script type="text/javascript" src="<%=contextPath %>/js/common-wjc/wjcDemo.js"></script>
    <script src="<%=contextPath %>/pages/entry-Detail/js/entryDetails.js"></script>
</body>
</html>
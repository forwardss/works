//单指标24小时趋势对比
var trendContrastOption = {
    grid: { // 控制图的大小，调整下面这些值就可以，
        y: 8,
        y2: "30%",
        x2: "2%",
        x: "5%",
        borderWidth: 0
    },
    legend: {
        y: 'bottom',
        x: 'center',
        width: "80%",
        padding: 100,
        itemWidth: 12,
        itemGap: 10,
        align: 'left',
        itemHeight: 4,
        selectedMode: false,
        textStyle: {
            color: '#666',
            fontStyle: 'normal',
            fontSize: 12
        },
        icon: 'rectangle',
        data: []
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'none',
            axis:'x',
            label: {
                show: true,
                color: '#f00'
            }
        }
    },
    xAxis: [{
        type: 'category',
        data: [],
        boundaryGap: false,
        axisTick: {
            lineStyle: {
                color: '#fff',
                shadowColor: '#00f',
                shadowOffsetX: 26
            }
        },
        axisLine: {
            onZero: false,
            lineStyle: {
                color: "#babdff"
            }
        }
    }, {
        axisTick: { show: false },
        splitLine: {
            show: false
        },
        axisLine: {
            onZero: false,
            lineStyle: {
                color: "#ccc"
            }
        },
    }],
    yAxis: {
        type: 'value',
        axisLine: {
            lineStyle: {
                color: "#ccc"
            }
        },
        axisTick: { show: false },
        splitLine: {
            show: false
        }
    },
    series: [
       
    ],
    noDataLoadingOption: {
        text: '无数据',
        effect: 'spin',
        textStyle:{
     		color:'#333'
     	},
        effectOption: {
            backgroundColor:'rgba(0,0,0,0)'
        }
     }
};

//各团队整点数据对比
var teamDataContrastOption = {
    grid: { // 控制图的大小，调整下面这些值就可以，
        y: 8,
        y2: "45%",
        x2: "8%",
        x: "6%",
        borderWidth: 0
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'none',
            axis:'x',
            label: {
                show: true,
                color: '#f00'
            }
        },
        formatter: function (data) {
            if (data) {
                data[0].color = "#a3a7fc";
                data[1].color = "#d8a1fe";
                data[2].color = "#7eedcf";
                var tmp = data[0].name + "<br>";
                for (var i = 0; i < data.length; i++) {
                    var len = data[i].seriesName.length;
                    if (data[i].seriesName.substring(len - 1) === "率") {
                        tmp += data[i].seriesName + '：' + data[i].value + '%<br>'
                    } else {
                        tmp += data[i].seriesName + '：' + data[i].value + '<br>'
                    }
                }
                return tmp;
            }
        }
    },
    color: ["#6c73fd", "#c573ff", "#17dda7", "#ff7379", "#21d8ff"],
    dataZoom: {
        type: 'slider',
        show: true,
        start: 0,
        end: 40,
        bottom: '10%',
        width: '80%',
        height: 30,
        left: '10%',
        dataBackgroundColor: '#9196ff',
        handleColor: '#9196ff',
        fillerColor: '#babdff',
        textStyle: {
            color: '#5a79ff',
            onZero: false
        }
    },
    legend: {
        y: 'bottom',
        x: 'center',
        width: "80%",
        padding: 12,
        itemGap: 10,
        align: 'left',
        itemHeight: 6,
        data: ['分配量', '拨打量', '提交件', '分配提交率', '拨打提交率']
    },
    xAxis: [
        {
            type: 'category',
            data: [],
            axisLine: {
                lineStyle: {
                    color: '#e2e4ea',
                    width: 1
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#efefef'
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#efefef'
                }
            },
            axisLabel: {
                interval: 0,
                rotate: 65
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '',
            axisTick: { show: false },
            position: 'left',
            axisLabel: {
                formatter: '{value}'
            },
            axisLine: {
                lineStyle: {
                    color: '#efefef'
                }
            },
            splitArea: {
                show: true,
                areaStyle:{
                	 color: ['rgba(249, 249, 249, 1)','rgba(255, 255, 255, 1)'],
                }
            },
            scale: true,
        },
        {
            type: 'value',
            name: '',
            axisTick: { show: false },
            position: 'right',
            offset: 80,
            axisLine: {
                lineStyle: {
                    color: '#efefef'
                }
            },
            axisLabel: {
                formatter: '{value}.00%',
                verticalAlign: 'center'
            },
            splitLine: { show: false }
        }
    ],
    series: [
        {
            name: '分配量',
            type: 'bar',
            data: []
        },
        {
            name: '拨打量',
            type: 'bar',
            data: []
        },
        {
            name: '提交件',
            type: 'bar',
            data: []
        },
        {
            name: '分配提交率',
            type: 'line',
            yAxisIndex: 1,
            data: []
        },
        {
            name: '拨打提交率',
            type: 'line',
            yAxisIndex: 1,
            data: []
        }
    ],
    noDataLoadingOption: {
        text: '无数据',
        effect: 'spin',
        textStyle:{
     		color:'#333'
     	},
        effectOption: {
            backgroundColor:'rgba(0,0,0,0)'
        }
     }
};

//分配提交率
var allotSubmitRatechartOption = {
	    calculable: false,
		title: {
	        text: '',
	        top:"54%",
	        right:"34%",
	        textStyle: {
	            color: '#393b4e',
	            fontSize: '14',
	            fontWeight:'lighter'
	        }
	    },
		color:["#eee","#6c73fd"],
	    series: [
	        {
	            name:'',
	            type:'pie',
	            radius: ['50%', '70%'],
	            hoverAnimation: false,
	            clickable: false,
	            tooltip: {
	                show: false,
	                showContent: false
	            },
	            data:[
	                {
	                	value:30, 
	                	name:'',
	                	hoverAnimation: false,
	    				legendHoverLink: false,
	    				itemStyle: {
	    	                normal: {
	    	                    labelLine: {
	    	                        show: false
	    	                    },
	    	                    color: '#efeff0',
	    	                    label: {
	    	                        show: false
	    	                    }
	    	                },
	    	                emphasis: {
	    	                    color: '#efeff0'
	    	                }
	    	            },
	                },
	                {
	                	value:70, 
	                	name:'分配提交率',
	                	hoverAnimation: false,
	                	itemStyle: {
	                        normal: {
	                            color: '#6c73fd',
	                            label: {
	                                show: true,
	                                position: 'center',
	                                formatter: function(dat){
	                                	return dat.value+"%";
	                                },
	                                textStyle: {
	                                    color: '#6c73fd',             
					                    fontSize: '30'				                   
	                                }
	                            }
	                        },
	                        emphasis: {
	                        	textStyle: {
	                                color: '#6c73fd',             
				                    fontSize: '18'
				                  
	                            }
	                        }

	                    }
	                }
	            ]
	        }
	    ]
	};
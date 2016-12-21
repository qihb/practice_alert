require.config({
	paths : {
		jquery : 'jquery',
		jqueryUI : 'jquery-ui'
	}
});

require(['jquery','window'],function($,w){

	//alert
	$('#a').click(function(){
		var win = new w.funWindow().alert({
			title:'提示',
			content:'welcome!',
			text4AlertBtn:'ok',
			handler4AlertBtn:function(){
				alert('you click button "ok"');
			},
			handler4CloseBtn:function(){
				alert('you click button "关闭"');
			},
			width:300,
			height:200,
			y:50,
			hasCloseBtn:true,
			skinClassName:'window_skin_a',
			dragHandle:'.window_header'
		}).on('alert',function(){
			alert('the 2 alert handler');
		}).on('close',function(){
			alert('the 2 close handler');
		});

		//可以使用handler4AlertBtn，也可以直接win.on();
		//win.on('alert',function(){alert('the 1 alert handler');});
		//win.on('alert',function(){alert('the 2 alert handler');});
		win.on('alert',function(){alert('the 3 alert handler');});
		//win.on('close',function(){alert('the 1 close handler');});
		//win.on('close',function(){alert('the 2 close handler');});
	});


	//confirm
	$('#b').click(function(){
		var win = new w.funWindow().confirm({
			title:'系统消息',
			content:'您确定要删除这个文件吗？',
			width:300,
			height:200,
			y:50,
			text4ConfirmBtn:'yes',
			text4CancelBtn:'no',
			hasCloseBtn:true,
			skinClassName:'window_skin_a',
			dragHandle:'.window_header'
		}).on('confirm',function(){
			alert('ok');
		}).on('cancel',function(){
			alert('no');
		}).on('close',function(){
			alert('close');
		});
	});

	//prompt
	$('#c').click(function(){
		var win = new w.funWindow().prompt({
			title:'情输入您的姓名',
			content:'我们会为您保密输入信息',
			width:300,
			height:200,
			y:50,
			text4PromptBtn:'输入',
			text4CancelBtn:'取消',
			defaultValue4PromptInput:'小漆',
			skinClassName:'window_skin_a',
			dragHandle:'.window_header',
			handler4PromptBtn:function(inputValue){
				alert('您输入的内容是：'+inputValue);
			},
			handler4CancelBtn:function(){
				alert('取消');
			}
		})
	});

	//common
	$('#d').click(function(){
		var win = new w.funWindow().common({
			content:'我是一个通用弹窗',
			width:300,
			height:200,
			y:50,
			skinClassName:'window_skin_a',
			dragHandle:'.window_header',
			hasCloseBtn:true,
		})
	});

});
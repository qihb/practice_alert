require.config({
	paths : {
		jquery : 'jquery'
	}
});

require(['jquery','window'],function($,w){

	//alert
	$('#a').click(function(){
		new w.funWindow().alert({
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
			skinClassName:'window_skin_a'
		});
	});

});
// vue界面渲染工作
$.get('/ajax/index',function(d){
	// debugger;
	new Vue({
		el: '#app',
		data: {
			// test : 'test data'
			top : d.items[0].data.data,
			hot : d.items[1].data.data,
			recommend : d.items[2].data.data,
			female : d.items[3].data.data,
			male : d.items[4].data.data,
			free : d.items[5].data.data,
			topic : d.items[6].data.data
			
		}
	})
},'json');
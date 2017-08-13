module.exports = function(fn){
	return function(){
		return new Promise((resolve, reject) => {
			fn.apply(fn, [...arguments, (err, result) => {
				if(err){
					return reject(err);
				}
				resolve(result);
			}]);
		});
	};
};

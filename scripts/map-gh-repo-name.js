module.exports = function({pipe}){
	var repos = JSON.parse(pipe);
	var names = repos.map(repo => {
		return repo.name;
	});
	return JSON.stringify(names, null, '\t');
};

module.exports = ({file, pipe}) => {
	return Object.keys(file).map(key => file[key]);
};

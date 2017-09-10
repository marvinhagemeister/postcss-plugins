const cloneDecl = require('./clone-decl');
const cloneRule = require('./clone-rule');
const matchSide = require('./match-side');

const matchInsetPrefix = require('./match-inset-prefix');

// inset-block, margin-block, padding-block
module.exports['block'] = (decl, values) => [
	cloneDecl(decl, '-top', values[0]),
	cloneDecl(decl, '-bottom', values[1] || values[0])
];

// inset-block-start, margin-block-start, padding-block-start
module.exports['block-start'] = (decl) => {
	decl.prop = decl.prop.replace(matchSide, '$1-top').replace(matchInsetPrefix, '');
};

// inset-block-end, margin-block-end, padding-block-end
module.exports['block-end'] = (decl) => {
	decl.prop = decl.prop.replace(matchSide, '$1-bottom').replace(matchInsetPrefix, '');
};

// inset-inline, margin-inline, padding-inline
module.exports['inline'] = (decl, values, dir) => {
	const ltrDecls = [
		cloneDecl(decl, '-left', values[0]),
		cloneDecl(decl, '-right', values[1] || values[0])
	];

	const rtlDecls = [
		cloneDecl(decl, '-right', values[0]),
		cloneDecl(decl, '-left', values[1] || values[0])
	];

	const isLTR = 1 === values.length || 2 === values.length && values[0] === values[1];

	return isLTR ? ltrDecls : 'ltr' === dir ? ltrDecls : 'rtl' === dir ? rtlDecls : [
		cloneRule(decl, 'ltr').append(ltrDecls),
		cloneRule(decl, 'rtl').append(rtlDecls),
	];
}

// inset-inline-start, margin-inline-start, padding-inline-start
module.exports['inline-start'] = (decl, values, dir) => {
	const ltrDecl = cloneDecl(decl, '-left', decl.value);
	const rtlDecl = cloneDecl(decl, '-right', decl.value);

	return 'ltr' === dir ? ltrDecl : 'rtl' === dir ? rtlDecl : [
		cloneRule(decl, 'ltr').append(ltrDecl),
		cloneRule(decl, 'rtl').append(rtlDecl)
	];
};

// inset-inline-end, margin-inline-end, padding-inline-end
module.exports['inline-end'] = (decl, values, dir) => {
	const ltrDecl = cloneDecl(decl, '-right', decl.value);
	const rtlDecl = cloneDecl(decl, '-left', decl.value);

	return 'ltr' === dir ? ltrDecl : 'rtl' === dir ? rtlDecl : [
		cloneRule(decl, 'ltr').append(ltrDecl),
		cloneRule(decl, 'rtl').append(rtlDecl)
	];
};

// inset-start, margin-start, padding-start
module.exports['start'] = (decl, values, dir) => {
	const ltrDecls = [
		cloneDecl(decl, '-top', values[0]),
		cloneDecl(decl, '-left', values[1] || values[0])
	];

	const rtlDecls = [
		cloneDecl(decl, '-top', values[0]),
		cloneDecl(decl, '-right', values[1] || values[0])
	];

	return 'ltr' === dir ? ltrDecls : 'rtl' === dir ? rtlDecls : [
		cloneRule(decl, 'ltr').append(ltrDecls),
		cloneRule(decl, 'rtl').append(rtlDecls)
	];
};

// inset-end, margin-end, padding-end
module.exports['end'] = (decl, values, dir) => {
	const ltrDecls = [
		cloneDecl(decl, '-bottom', values[0]),
		cloneDecl(decl, '-right', values[1] || values[0])
	];

	const rtlDecls = [
		cloneDecl(decl, '-bottom', values[0]),
		cloneDecl(decl, '-left', values[1] || values[0])
	];

	return 'ltr' === dir ? ltrDecls : 'rtl' === dir ? rtlDecls : [
		cloneRule(decl, 'ltr').append(ltrDecls),
		cloneRule(decl, 'rtl').append(rtlDecls)
	];
};
export const uid = new Proxy({$: Number(String(Math.random()).slice(3,9))}, {
    get (obj, prop) {
        return void (obj[prop] = obj[prop] || 'z' + (obj.$ += 1)) || obj[prop];
    }
});
export const nid = new Proxy(uid, {
	get (obj, prop) {
		return '#' + obj[prop];
	}
});
export const cid = new Proxy(uid, {
	get (obj, prop) {
		return '.' + obj[prop];
	}
});



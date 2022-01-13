const NODE_ENV = process.env.NODE_ENV
import { requerst } from "../config/http.js"

const httpRequest = ((url, type, data, header) => {
	return new Promise((resolve, reject) => {
		uni.request({
		    url: NODE_ENV === 'development'?`${requerst.localApi}${url}`:`${requerst.serverApi}${url}`,
			method: type || 'GET',
		    data: data || {},
		    header: header || {'content-type' : "application/json"},
		}).then((response) => {
			console.log(response)
            let [error, res] = response;
			if(error) {
				return reject(error)
			}
            return resolve(res)
        })
	})
})

export default httpRequest

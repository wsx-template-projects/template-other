console.log('今天是2021年3月8号')

// declare  声明文件关键字


        function doSometing(name) {
            console.log('Hello ' + name)
			return `name: ${name}`
        }
        function myDecorator(fn) {
			// let num = 1
            return function() {
				// num++
				// console.log(num)
				// console.log(name,arguments)
                console.log('start')
                const res = fn.apply(this, arguments)
                console.log('end')
                return res
            }
        }
        const wrapped = myDecorator(doSometing)
        doSometing('lindaidai')
        //Hello lindaidai
        
        const name = wrapped('lindaidai')
        //start 
        //Hello lindaidai
        //end
		console.log(name)
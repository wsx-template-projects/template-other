// 6：00 - 8：00
// 早晨、吃早餐、工作、吃中餐、午休、工作、午餐、娱乐时间、睡觉 ==》1，2，3，4，5，1，6，7，8
// 简化版 ==》吃饭、工作、娱乐、睡觉 ==》1、2、3、4
const enum StateEnum {
	eatState = 1,
	workState = 2,
	playState = 3,
	sleepState = 4
}

interface State {
	state: StateEnum,
	eat(),
	work(),
	play(),
	sleep(),
}

// 吃饭状态
class EatState implements State {
	// 
	state: State;
	calendar: Calendar;
	constructor (calendar: Calendar) {
		this.calendar = Calendar
	}
	eat () {
		
	}
	work () {
		
	}
	sleep () {
		
	}
	play () {
		
	}
}
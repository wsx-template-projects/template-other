import {RunState} from "./stateInterface"

export class SpeedUp implements RunState {
	static state: String = 'speed_up';
	private time: Number = 6;
	public run (hero: Hero) {
		console.log('加速跑动中')
		setTimeout(() => {
			// 设置正常状态
			console.log('加速结束，开始正常速度跑动了')
			hero.setState('common')
		},this.time)
	}
}

export class SpeedDown implements RunState {
	static state: String = 'speed_down';
	private time: Number = 6;
	public run (hero: Hero) {
		console.log('减速跑动中')
		setTimeout(() => {
			// 设置正常状态
			console.log('减速结束，开始正常速度跑动了')
			hero.setState('common')
		},this.time)
	}
}

export class Swim implements RunState {
	static state: String = 'swim';
	private time: Number = 6;
	public run (hero: Hero) {
		console.log('眩晕中')
		setTimeout(() => {
			// 设置正常状态
			console.log('眩晕结束，开始正常速度跑动了')
			hero.setState('common')
		},this.time)
	}
}
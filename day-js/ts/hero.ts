import {RunState} from "./stateInterface"
import {SpeedUp, SpeedDown, Swim} from "./state"
// 英雄类
class Hero {
	public static COMMON = 'common' // 正常状态
	public static SPEED_UP = SpeedUp.state // 加速状态
	public static SPEED_DOWN = SpeedDown.state // 减速状态
	public static SWIM = Swim.state // 眩晕状态
	public state: RunState = 'common' // 默认正常状态 
	public setState (state: RunState) {
		console.log('异常状态结束，状态开始改变为正常状态了')
		this.state = state
	}
	// 停止跑动
	public stopRun () {
		console.log('停止跑动')
	}
	// 开始跑动
	public startRun () {
		console.log('开始跑动')
	}
}
interface RunState {
	public state: String, // 状态
	public run(hero: Hero): void // 跑动方法
}

export {RunState}
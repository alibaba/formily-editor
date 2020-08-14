type EventCallback = (this: EventEmitter, ...args: any[]) => void

interface EventListener {
	callback: EventCallback;
	once: boolean;
}

interface EventMap {
	[eventName: string]: EventListener[];
}

interface TimerMap {
	[eventName: string]: ReturnType<typeof setTimeout>;
}

class EventEmitter {
	private _events: EventMap
	private _timers: TimerMap

	removeEventListener: (name: string, callback: EventCallback) => EventEmitter
	addEventListener: (name: string, callback: EventCallback) => EventEmitter

	constructor() {
		this._events = Object.create(null)
		this._timers = Object.create(null)
	}

	private _addListener(name: string, callback: EventCallback, once: boolean): this {
		if (typeof callback !== 'function') throw new TypeError('Event callback must be a function')

		let listener = { callback, once }

		if (!this._events[name]) this._events[name] = []

		this._events[name].push(listener)

		return this
	}

	on(name: string, callback: EventCallback): this {
		return this._addListener(name, callback, false)
	}

	once(name: string, callback: EventCallback): this {
		return this._addListener(name, callback, true)
	}

	off(name: string, callback: EventCallback): this {
		if (typeof callback !== 'function') throw new TypeError('Event callback must be a function')

		if (!this._events[name]) return this

		let listeners = this._events[name]

		for (let i = listeners.length - 1; i >= 0; i--) {
			if (listeners[i].callback === callback) {
				listeners.splice(i, 1)

				if (listeners.length === 0) delete this._events[name]

				break
			}
		}

		return this
	}

	emit(name: string, ...args: any[]): this {
		if (this._events[name]) {
			let listeners = this._events[name]

			for (let i = 0; i < listeners.length; i++) {
				let listener = listeners[i]

				listener.callback.apply(this, args)

				if (listener.once) listeners.splice(i--, 1)
			}

			return this
		} else if (String(name) === 'error') {
			let err: Error

			if (args.length > 0) {
				err = args[0]
			} else {
				err = new Error('Unknown error')
			}

			throw err
		}
	}

	emitDelay(time: number, name: string, ...args: any[]): this {
		let ti = this._timers[name]

		if (typeof ti === 'number') clearTimeout(ti)

		this._timers[name] = setTimeout(() => {
			delete this._timers[name]

			this.emit(name, ...args)
		}, time)

		return this
	}
}

EventEmitter.prototype.addEventListener = EventEmitter.prototype.on
EventEmitter.prototype.removeEventListener = EventEmitter.prototype.off

export default EventEmitter

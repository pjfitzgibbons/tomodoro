import { Controller } from '@hotwired/stimulus'

export default class extends Controller {

    static targets = ["task"]

    constructor() {
      super()
      console.log("hello task_controller")
    }

    dragStart(event) {
        console.log("dragStart", event.target.id)
    }
}

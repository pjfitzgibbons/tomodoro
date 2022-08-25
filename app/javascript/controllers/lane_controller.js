import { Controller } from '@hotwired/stimulus'

export default class LaneController extends Controller {
    connect() {
        console.log("lane_controller connect")
    }

    newClick(event) {
        console.log("lane new click", event.target)
    }
}

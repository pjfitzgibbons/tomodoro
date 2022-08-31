import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["card", "lane"]

    findDragTarget(el) {
        console.log("findDragTarget", el)
        if (el.dataset?.dragTarget) return el

        return (el.parentElement && this.findDragTarget(el.parentElement))
    }

    findUrl(el) {
        if (el.dataset?.dragUrl) return el.dataset.dragUrl

        return (el.parentElement && this.findUrl(el.parentElement))
    }

    dragStart(event) {

        this.dragSrcEl = this.findDragTarget(event.target)
        this.setOpacity()

        console.log("dragStart", {dragSrcEl: this.dragSrcEl})
        event.dataTransfer.effectAllowed = "move"
        event.dataTransfer.setData("text/html", event.target.innerHtml)
    }

    setOpacity() {
        if (this.dragSrcEl) {
            this.dragSrcEl.style.opacity = "0.4"
        }
    }

    dragEnter(event) {
        event.target.classList.add("drag-over")

        event.preventDefault && event.preventDefault()
        return false
    }

    dragOver(event) {
        event.preventDefault && event.preventDefault()
        return false
    }

    dragLeave(event) {
        event.target.classList.remove("drag-over")
        this.resetOpacity()
    }

    drop(event) {
        event.stopPropagation()

        event.target.classList.remove("drag-over")
        this.resetOpacity()

        console.log("drop... finding target")
        let dropTarget = this.findDragTarget(event.target)

        console.log("drop", {data: dropTarget})
        let cardId = this.dragSrcEl.dataset.cardId
        let laneId = dropTarget.dataset.laneId
        let position = dropTarget.dataset.position
        let url = this.findUrl(event.target).replace(":lane_id", laneId).replace(":id", cardId)
        console.log("drop", {url, position, originalPosition: this.dragSrcEl.dataset.position})

        fetch(url, {
            method: 'PATCH',
            credentials: "same-origin",
            headers: {
                Accept: "text/vnd.turbo-stream.html",
                "Content-Type": "application/json",
                "X-CSRF-Token": document.head.querySelector("[name='csrf-token']").content
            },
            body: JSON.stringify({position})
        })
            .then((response) => {
                return response.text()
            })
            .then((text) => {
                return Turbo.renderStreamMessage(text)
            })

    }

    dragEnd() {
        this.resetOpacity()
    }

    resetOpacity() {
        if (this.dragSrcEl) {
            this.dragSrcEl.style.opacity = "1"
        }
    }
}

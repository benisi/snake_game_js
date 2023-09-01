const OFFSET_FROM_EDGE = 20;

class Food {
    constructor(){
        this.createFood();
        this.refreshPosition();
    }

    createFood() {
        this.instance = document.createElement("div");
        this.instance.style.backgroundColor = 'red';
        this.instance.style.borderRadius = '5px 5px';
        this.instance.style.position = 'absolute';
        this.instance.style.width = '10px';
        this.instance.style.height = '10px';
        document.getElementById("board").appendChild(this.instance);
    }

    refreshPosition() {
        const boardEdges = document.getElementById("board").getBoundingClientRect();
        const top = Math.random() * ((boardEdges.bottom - OFFSET_FROM_EDGE) - (boardEdges.top + OFFSET_FROM_EDGE)) + (boardEdges.top + OFFSET_FROM_EDGE);
        const left = Math.random() * ((boardEdges.right - OFFSET_FROM_EDGE) - (boardEdges.left + OFFSET_FROM_EDGE)) + (boardEdges.left + OFFSET_FROM_EDGE);
        this.instance.style.left = `${left}px`;
        this.instance.style.top = `${top}px`;
    }
}

export default Food;
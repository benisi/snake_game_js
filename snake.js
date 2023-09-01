
class Snake {
  constructor() {
    this.segments = [];
    this.segmentSize = 16;
    this.create();
    this.head = this.segments[0];
  }

  createSegment(x, y) {
    const segment = document.createElement("div");
    const board = document.getElementById("board");
    segment.style.height = `${this.segmentSize}px`;
    segment.style.width = `${this.segmentSize}px`;
    segment.style.backgroundColor = "white";
    segment.style.position = "absolute";
    segment.style.top = `${y}px`;
    segment.style.left = `${x}px`;
    board.appendChild(segment);
    this.segments.push(segment);
  }

  grow() {
    const left = Number(
      this.segments[this.segments.length - 1].style.left.replace("px", "")
    );
    const top = Number(
      this.segments[this.segments.length - 1].style.top.replace("px", "")
    );
    this.createSegment(left, top);
  }

  create() {
    const startingCordinate = [
      [0, 0],
      [16, 0],
      [32, 0],
    ];
    const container = document.getElementById("app").getBoundingClientRect();
    startingCordinate.forEach((cordinate) => {
      this.createSegment(
        container.right / 2 + cordinate[0],
        container.bottom / 2 + cordinate[1]
      );
    });
  }

  move(direction) {
    for (let i = this.segments.length - 1; i > 0; i--) {
      const left = Number(this.segments[i - 1].style.left.replace("px", ""));
      const top = Number(this.segments[i - 1].style.top.replace("px", ""));

      const segment = this.segments[i];
      segment.style.top = `${top}px`;
      segment.style.left = `${left}px`;
    }

    const left = Number(this.head.style.left.replace("px", ""));
    const top = Number(this.head.style.top.replace("px", ""));

    switch (direction) {
      case "up":
        this.head.style.top = `${top - 16}px`;
        this.head.style.left = `${left}px`;
        break;
      case "down":
        this.head.style.top = `${top + 16}px`;
        this.head.style.left = `${left}px`;
        break;
      case "left":
        this.head.style.left = `${left - 16}px`;
        this.head.style.top = `${top}px`;
        break;
      case "right":
        this.head.style.left = `${left + 16}px`;
        this.head.style.top = `${top}px`;
        break;
    }
  }
}

export default Snake;

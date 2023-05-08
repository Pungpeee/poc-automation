import React, { Component } from "react"
// import "./custom.css";
import { isMobile } from "react-device-detect"
import Image from "next/image"
import { Handshake } from "@mui/icons-material"

const slider = React.createRef()
const container = React.createRef()
const isTouchDevice = isMobile

export default class CustomButton extends Component {
  state = {}

  componentDidMount() {
    if (isTouchDevice) {
      document.addEventListener("touchmove", this.onDrag, { passive: false })
      document.addEventListener("touchend", this.stopDrag, { passive: false })
    } else {
      document.addEventListener("mousemove", this.onDrag)
      document.addEventListener("mouseup", this.stopDrag)
    }
    this.containerWidth = container.current.clientWidth - 44
  }

  

  onDrag = (e) => {
    if (this.unmounted || this.state.unlocked) return
    if (this.isDragging) {
      if (isTouchDevice) {
        this.sliderLeft = Math.min(Math.max(0, e.touches[0].clientX - this.startX), this.containerWidth)
      } else {
        this.sliderLeft = Math.min(Math.max(0, e.clientX - this.startX), this.containerWidth)
      }
      this.updateSliderStyle()
    }
  }

  updateSliderStyle = () => {
    if (this.unmounted || this.state.unlocked) return
    slider.current.style.left = this.sliderLeft + 44 + "px"
  }

  stopDrag = () => {
    const { handleMint, handleClaim, handleBuy} = this.props
    if (this.unmounted || this.state.unlocked) return
    if (this.isDragging) {
      this.isDragging = false
      if (this.sliderLeft > this.containerWidth * 0.9) {
        this.sliderLeft = this.containerWidth
        if ((this.sliderLeft = this.containerWidth)) {
          if (handleClaim) {
            handleClaim()
            // this.sliderLeft = 0
          }
          if (handleMint) {
            handleMint()
          }
          if (handleBuy) {
            handleBuy()
            // this.sliderLeft = 0
          }
          // this.sliderLeft = 0
        }
        // if (this.props.onSuccess) {
        //   this.props.onSuccess()
        //   this.onSuccess()
        // }
      } else {
        this.sliderLeft = 0
        // if (this.props.onFailure) {
        //   this.props.onFailure()
        // }
      }
      this.updateSliderStyle()
    }
  }

  startDrag = (e) => {
    if (this.unmounted || this.state.unlocked) return
    this.isDragging = true
    // if (isTouchDevice) {
    this.startX = e.touches[0].clientX
    // } else {
    //   this.startX = e.clientX
    // }
  }

  startDragMouse = (e) => {
    if (this.unmounted || this.state.unlocked) return
    this.isDragging = true
    this.startX = e.clientX
  }

  onSuccess = () => {
    container.current.style.width = container.current.clientWidth + "px"
    console.log("rerere")
    this.setState({
      unlocked: true,
    })
  }

  getText = () => {
    return this.state.unlocked ? this.props.text_unlocked || "UNLOCKED" : this.props.text || "Redeemed"
  }

  //   reset = () => {
  //     if (this.unmounted) return
  //     this.setState({ unlocked: false }, () => {
  //       this.sliderLeft = 0
  //       this.updateSliderStyle()
  //     })
  //   }

  componentWillUnmount() {
    this.unmounted = true
  }

  render() {
    return (
      <div className="ReactSwipeButton">
        <div
          style={{ background: `${this.props.disabled ? "#979797" : "#f2f8f6"}` }}
          className={"rsbContainer " + (this.state.unlocked ? "rsbContainerUnlocked" : "")}
          ref={container}
        >
          <div
            className="rsbcSlider"
            ref={slider}
            onMouseDown={this.props.disabled ? null : this.startDragMouse}
            style={{ background: "linear-gradient(360deg, #1FA37C 0%, rgba(31, 163, 124, 0) 100%), #79C8B0" }}
            onTouchStart={this.props.disabled ? null : this.startDrag}
          >
            <span className="rsbcSliderText">{this.props.Text1 ??  "Redeemed"}</span>
            {/* <span className="rsbcSliderArrow"></span> */}
            <span className="rsbcSliderCircle">
              <Image src="/redeem_NFT/slide_icon.svg" alt="" width={26} height={18.35} />
            </span>
          </div>
          <div className="rsbcText">{this.props.Text2 ??  "Slide to redeem"}</div>
        </div>
      </div>
    )
  }
}

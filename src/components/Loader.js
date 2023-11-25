function Loader({loaderSize, inCart, isLoad}) {
const boxstyle = {width: `${loaderSize}px`, height: `${loaderSize}px`}
  return (
        <div className="loader-demo-box text-center">
            {isLoad? 
                <div className="jumping-dots-loader"> <span style={boxstyle}>
                    </span> <span style={boxstyle}></span> <span style={boxstyle}></span> 
                </div>
            : inCart}
        </div>
  )
}

export default Loader
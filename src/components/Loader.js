function Loader({loaderSize, inCart, isLoad}) {
const my_label = typeof inCart === 'number' && Number.isInteger(inCart) && inCart > 0? inCart: "";
const boxstyle = {width: `${loaderSize}px`, height: `${loaderSize}px`}
  return (
        <div className="loader-demo-box text-center">
            {isLoad? 
                <div className="jumping-dots-loader"> <span style={boxstyle}>
                    </span> <span style={boxstyle}></span> <span style={boxstyle}></span> 
                </div>
            : my_label}
        </div>
  )
}

export default Loader
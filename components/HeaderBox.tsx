const HeaderBox = ({type = "title", title, subtext, user} : HeaderBoxProps) => {   // The types of all these props are already defined in index.d.ts under the name HeaderBoxProps so Now user cant put wrong types of data in these props
  return (
    <div className="header-box">
        <h1 className="header-box-title">
            {title}
            {type === 'greeting' && (
                <span className="text-bankGradient">
                    &nbsp;{user}
                </span>
            )}
        </h1>
        <p className="header-box-subtext">{subtext}</p>
    </div>
  )
}

export default HeaderBox
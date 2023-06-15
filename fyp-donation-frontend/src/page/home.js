import Menu from "../components/menu";

export default function HomePage(){
    return (
        <div>
            <div className="landing-holder" >

                <Menu/>
                <div className="main-bg landing-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7 mt-5">
                                <div className="subtitle text-white mb-3">Give Hope, Give Life</div>
                                <h2 className="title mb-3" >
                                    JOIN US IN MAKING A <br/>
                                    DIFFERENCE: DONATE <br/>
                                    TODAY! <br/>
                                </h2>


                                <h6 className="text-white">
                                    Give your unwanted itema a new purpose and bring joy to someone else's life. <br />
                                    donate them today!
                                </h6>
                            </div>
                            <div className="col-md-5">
                                <img src="/landing.jpg" className="w-100" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
import Menu from "../components/menu";

export default function Social(){
    return (
        <div>
        <Menu />

        <div className="container my-5">
            <div className="row">
                <div className="col-md-8">
                  <strong><h3>Social Cause</h3></strong>
                  <hr/>
                    <p>
                    At Sahyogh, we are committed to making a positive impact on the lives of the people in Nepal. Through our platform, we aim to support various social causes that are close to our hearts.
                    </p>
                    <p>
                    Nepal, a small landlocked country in South Asia, faces numerous social challenges such as poverty, gender inequality, inadequate healthcare, and education, among others. Sahyogh is committed to working towards these causes by providing support and aid to the communities in need.
                    </p>
                    <p>
                    Through our collaborations with local organizations and community leaders, we identify the most pressing social issues and work to provide sustainable solutions that will have a lasting impact. Our mission is to improve the lives of marginalized communities and promote positive social change throughout Nepal.
                    </p>
                    <p>
                    Join us in our mission to make a positive impact in Nepal. Your support can help us reach more communities in need and bring about long-lasting change. Together, we can make a difference.
                    </p>
                </div>
                <div className="col-md-4">
                    <img src="/sahyogh-logo-white.jpg" alt="" className="w-100" />
                </div>
            </div>
        </div>
        </div>
    )
}
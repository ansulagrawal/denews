import React from 'react'

function AuditCard() {
    return(
        <div style={{display: 'flex', flexDirection: "column", backgroundColor: "#f5f5f5", flex: 1, padding: "45px", borderRadius: "20px"}}>
            <div className="titleRow" style={{fontSize: "24px", fontWeight: "bold"}}>Genuine Article</div>
            <div className="descriptionRow" style={{marginTop: "20px"}}>
                I found 4 different news content posted recently by trusted sources which back the claims made by the author.
                <br />
                Here are the links to the articles: -
                <br />
                <ol>
                    <li>https://timesofindia.indiatimes.com/world/pakistan/pakistan-political-crisis-april-9/liveblog/90738320.cms</li>
                    <li>https://www.youtube.com/watch?v=sKHbAqVEvMU</li>
                    <li>https://indianexpress.com/article/explained/explained-shehbaz-sharif-take-over-as-prime-minister-of-pakistan-7862540/</li>
                    <li>https://www.youtube.com/watch?v=912gWW7RQGc</li>
                </ol>
                <br />
                <b>Auditor Address</b>: 0xc567d52d6901477f655e867D1713507530Fe2BaE
                <br />
                <b>Rewards</b>: 0.001 ETH
                <br />
                <button
                    className="auditFormButton"
                    style={{ width: "185px" }}
                    onClick={() => alert("coming soon")}
                >
                    Reward&nbsp;Audit
                </button>
                

            </div>
        </div>
    )
}

function AuditReports() {
    return (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "50px"}}>
            <center style={{marginBottom: "20px"}}><h1>Audit Reports</h1></center>
            <AuditCard />
        </div>
    )
}

export default AuditReports

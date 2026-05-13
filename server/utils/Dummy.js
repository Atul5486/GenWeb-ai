export const dummySite={
    "message":"Your website is here",
    "code":`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Loading</title>
</head>
<body>
     <div  class="loader-wrap">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <path id="svg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z"></path>
        </svg>
        <div class="loader-wrap-heading">
            <div class="load-text">
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
            </div>
        </div>
    </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" integrity="sha512-7eHRwcbYkK4d9g/6tD/mhkf++eoTHwpNM9woBxtPUBWm67zeAfFC+HrdoE2GanKeocly/VxeLvIqwvCdk7qScg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>  
    const svg = document.getElementById("svg");
    const tl = gsap.timeline({
repeat:-1});
    const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
    const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

    tl.to(".loader-wrap-heading .load-text , .loader-wrap-heading .cont", {
        delay: 2,
        y: -100,
        opacity: 0,
    });
    tl.to(svg, {
        duration: 0.5,
        attr: { d: curve },
        ease: "power2.easeIn",
    }).to(svg, {
        duration: 0.5,
        attr: { d: flat },
        ease: "power2.easeOut",
    });
    tl.to(".loader-wrap", {
        y: -1500,
    });
    tl.to(".loader-wrap", {
        zIndex: -1,
        display: "none",
    });

    </script>
</body>
</html>
`
}
export const updatedSite={
    "message":"Your website is here",
    "code":`
    <!DOCTYPE html>
    <html>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js"
    integrity="sha512-NcZdtrT77bJr4STcmsGAESr06BYGE8woZdSdEgqnpyqac7sugNO+Tr4bGwGF3MsnEkGKhU2KL2xh6Ec+BqsaHA=="
    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

    <style>
*{
margin:0;
padding:0;
}
        .body{
            width: 100%;
            height: 100vh; /* better for visible animation */
            display: flex;
            margin: 0;
            overflow: hidden;
        }
        .box{
            width: 20%;
            height: 100%;
            background-color: black;
        }
    </style>

<body>
    <div class="body">
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
    <div class="box"></div>
</div>
    <script>
        const tl = gsap.timeline({
repeat:-1});  //Remove repeat form it for only once

tl.from(".box", {
    y: "-100%",
    stagger: 0.1,
    duration: 0.6,
})
.to(".box", {
    y: "100%",
    stagger: 0.1,
    duration: 0.5,
    visiblity:"hidden",
});

    </script>
</body>
</html>
`
}

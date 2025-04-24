"use client";
import * as React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

function Invest() {
  return (
<<<<<<< HEAD
    <div className="bg-white">
      <Container fluid className="py-5">
        <Row className="mb-5">
          <Col md={12} className="text-start px-4">
            <h1 className="display-5 mt-5">We make it easy to start investing.</h1>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <h3 className="h4">
              <strong>Browse</strong> hundreds of investment opportunities, connect
              with entrepreneurs, and manage your investment contacts with the
              world's Entrepreneur network.
            </h3>
            <h5 className="mt-4">Follow Us</h5>
            <div className="d-flex gap-2 mt-3">
              {[
                "5af065c5520ae218cda23d2494f00a15430cab52",
                "974c3c3e7f16f24929b6e8d24ef8dd072fe0e2ec",
                "76333511bb5bb69d2acf99a1f8e3bb83d721eb40",
                "9920bdb6c892f438fe0415b5d5a29a3b395cafba",
                "0ed0b013dd8bcdf2dc854fc2ec5ec7ce0f861456",
              ].map((id) => (
                <img
                  key={id}
                  src={`https://cdn.builder.io/api/v1/image/assets/TEMP/${id}?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97`}
                  alt="Social Icon"
                  className="img-fluid"
                  style={{ width: "40px", height: "40px" }}
                />
              ))}
            </div>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="position-relative border-0" style={{position:"relative"}}>
              <Card.Img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d11bd8b663851db6a3d75e21352ea0c8fbee94df?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                alt="Background"
                className="img-fluid"
              />
              <Card.Body className="p-4" style={{position:"absolute"}}>
                {[
                  { bg: "bg-primary text-white", textColor: "text-white" },
                  { bg: "bg-light", textColor: "text-dark" },
                ].map((style, index) => (
                  <Card key={index} className={`mb-3 rounded-4 ${style.bg}`}>
                    <Card.Body className="d-flex flex-column flex-md-row">
                      <div className="flex-grow-1">
                        <div className="d-flex gap-3">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b45c590850af54ec1ea5a845137c9a2eda78b1d8?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                            alt="Venture"
                            className="img-fluid rounded-3"
                            style={{ width: "60px" }}
                          />
                          <div>
                            <h4 className="mb-1">IDEA-Venture</h4>
                            <p className="mb-1">Investment Start-up</p>
                            <p className="mb-0">Seed stage</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <p className={`mb-1 ${style.textColor}`}>
                          EGP 15,000
                        </p>
                        <small>Min per Investor</small>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={7} className="mb-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0e2ef40b67c649e8c470d8e700d29d9848bb50d?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
              alt="Investment"
              className="img-fluid rounded-4"
            />
          </Col>
          <Col md={5} className="d-flex align-items-center">
            <div className="text-center">
              <h3 className="h4">
                <strong>Find the best investment deals</strong>
              </h3>
              <p className="fs-5">
                Access the largest network of entrepreneurs. Filter opportunities
                by country, location, industry, stage, investment range, and
                language to find the deal for you.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      <div className="bg-dark text-white py-5">
        <Container>
          <h3 className="text-center mb-5">
            Seamless Experience: Our Platform Now Also Accessible via Mobile App
          </h3>
          <Row>
            <Col md={7} className="mb-4">
              <div className="d-flex flex-column">
                <div className="d-flex gap-3">
                  <div>
                    {[
                      "a39aa70844f377d8877c85e557b86f96dfb96900",
                      "6232b12c7b72a4a29282e2e00f5696e6eafa5b77",
                      "68e65d213653dede69c85cd5a84748327c655ba9",
                    ].map((id) => (
                      <img
                        key={id}
                        src={`https://cdn.builder.io/api/v1/image/assets/TEMP/${id}?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97`}
                        alt="Icon"
                        className="img-fluid mb-3"
                        style={{ width: "50px" }}
                      />
                    ))}
                  </div>
                  <div>
                    <p className="fs-5">
=======
    <div
      className="flex overflow-hidden flex-col pt-9 bg-white"
    >
      <div className="flex flex-col items-start pl-3.5 w-full max-md:max-w-full">
        
        
        <div
          className="mt-60 ml-10 text-6xl text-black bg-blend-normal w-[708px] max-md:mt-10 max-md:max-w-full max-md:text-4xl"
        >
          We make it easy to start investing.
        </div>
        <div
          className="self-end px-1.5 mt-5 max-w-full w-[1681px] max-md:pr-5"
          space={5}
        >
          <div className="flex gap-5 max-md:flex-col max-md:">
            <div
              className="w-6/12 max-md:ml-0 max-md:w-full"
            >
              <div className="flex z-10 flex-col items-start mt-9 w-full max-md:mt-10 max-md:max-w-full">
                <div
                  className="self-stretch text-4xl tracking-tighter text-black leading-[86px] max-md:max-w-full"
                >
                  <span style={{fontWeight: 700}}>Browse</span> hundreds of
                  investment opportunities, connect with entrepreneurs and
                  manage your investment contacts with the world's Entrepreneur
                  network.
                </div>
                <div
                  className="mt-16 ml-2.5 text-xl font-bold text-black max-md:mt-10"
                >
                  Follow Us
                </div>
                <div className="flex gap-3 items-start mt-7">
                  {/* <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5af065c5520ae218cda23d2494f00a15430cab52?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                    className="object-contain shrink-0 aspect-[1.02] w-[51px]"
                  />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/974c3c3e7f16f24929b6e8d24ef8dd072fe0e2ec?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                    className="object-contain shrink-0 aspect-square w-[50px]"
                  />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/76333511bb5bb69d2acf99a1f8e3bb83d721eb40?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                    className="object-contain shrink-0 aspect-square w-[50px]"
                  />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9920bdb6c892f438fe0415b5d5a29a3b395cafba?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                    className="object-contain shrink-0 aspect-square w-[50px]"
                  />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ed0b013dd8bcdf2dc854fc2ec5ec7ce0f861456?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                    className="object-contain shrink-0 aspect-square w-[50px]"
                  /> */}
                </div>
              </div>
            </div>
            <div
              className="ml-5 w-6/12 max-md:ml-0 max-md:w-full"
            >
              <div className="flex relative flex-col items-center self-stretch px-20 pt-32 pb-96 my-auto rounded-none min-h-[806px] max-md:px-5 max-md:py-24 max-md:-mt-20 max-md:max-w-full">
                {/* <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d11bd8b663851db6a3d75e21352ea0c8fbee94df?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                  className="object-cover absolute inset-0 size-full"
                /> */}
                <div className="relative max-w-full w-[526px]">
                  <div
                    className="pt-1.5 pr-8 pb-5 pl-3.5 w-full bg-blue-900 rounded-[40px] max-md:pr-5 max-md:max-w-full"
                    space={77}
                  >
                    <div className="flex gap-5 max-md:flex-col max-md:">
                      <div
                        className="w-9/12 max-md:ml-0 max-md:w-full"
                      >
                        <div className="flex grow gap-3.5 text-xl leading-loose text-white max-md:mt-10">
                          {/* <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b45c590850af54ec1ea5a845137c9a2eda78b1d8?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                            className="object-contain shrink-0 self-start mt-3.5 w-20 aspect-[0.98] rounded-[30px]"
                          /> */}
                          <div className="flex flex-col">
                            <div
                              className="text-3xl font-bold leading-none"
                            >
                              IDEA-Venture
                            </div>
                            <div
                              className="self-start mt-3"
                            >
                              Investment Start-up
                            </div>
                            <div className="flex flex-col items-start pr-11 pl-2 mt-3 text-black max-md:pr-5">
                              <div
                                className="z-10"
                              >
                                Seed stage
                              </div>
                              <div className="flex shrink-0 w-28 rounded-3xl bg-zinc-100 bg-opacity-90 h-[23px]" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="ml-5 w-3/12 max-md:ml-0 max-md:w-full"
                      >
                        <div className="self-stretch my-auto text-white max-md:mt-10">
                          <div
                            className="text-xl leading-loose"
                          >
                            EGP 15,000{" "}
                          </div>
                          <div
                            className="mt-3 text-xs leading-4 max-md:mr-1.5"
                          >
                            Min per Investor
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="pt-1.5 pr-8 pb-5 pl-3.5 mt-16 w-full bg-blue-100 rounded-[40px] max-md:pr-5 max-md:mt-10 max-md:max-w-full"
                    space={77}
                  >
                    <div className="flex gap-5 max-md:flex-col max-md:">
                      <div
                        className="w-9/12 max-md:ml-0 max-md:w-full"
                      >
                        <div className="flex grow gap-3.5 text-xl leading-loose text-black max-md:mt-10">
                          {/* <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/b45c590850af54ec1ea5a845137c9a2eda78b1d8?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                            className="object-contain shrink-0 self-start mt-3.5 w-20 aspect-[0.98] rounded-[30px]"
                          /> */}
                          <div className="flex flex-col">
                            <div
                              className="text-3xl font-bold leading-none"
                            >
                              IDEA-Venture
                            </div>
                            <div
                              className="self-start mt-3 text-zinc-800"
                            >
                              Investment Start-up
                            </div>
                            <div className="flex flex-col items-start pr-11 pl-2 mt-3 max-md:pr-5">
                              <div
                                className="z-10"
                              >
                                Seed stage
                              </div>
                              <div className="flex shrink-0 w-28 rounded-3xl bg-stone-300 bg-opacity-90 h-[23px]" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="ml-5 w-3/12 max-md:ml-0 max-md:w-full"
                      >
                        <div className="self-stretch my-auto text-zinc-800 max-md:mt-10">
                          <div
                            className="text-xl leading-loose"
                          >
                            EGP 15,000{" "}
                          </div>
                          <div
                            className="mt-3 text-xs leading-4 max-md:mr-1.5"
                          >
                            Min per Investor
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mt-64 w-full max-w-[1687px] max-md:mt-10 max-md:max-w-full"
          space={51}
        >
          <div className="flex gap-5 max-md:flex-col max-md:">
            <div
              className="w-[58%] max-md:ml-0 max-md:w-full"
            >
              {/* <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a0e2ef40b67c649e8c470d8e700d29d9848bb50d?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                className="object-contain grow w-full aspect-[1.15] rounded-[40px] max-md:mt-10 max-md:max-w-full"
              /> */}
            </div>
            <div
              className="ml-5 w-[42%] max-md:ml-0 max-md:w-full"
            >
              <div
                className="self-stretch my-auto text-4xl tracking-tighter text-center text-black leading-[86px] max-md:mt-10 max-md:max-w-full"
              >
                <span style={{fontWeight: 700, fontSize: "48px"}}>
                  Find the best investment deals
                </span>
                <br />
                <span style={{fontSize: "32px"}}>
                  Access the largest network of entrepreneurs. Filter
                  opportunities by country, location, industry, stage,
                  investment range and language to find the deal for you.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-24 pr-20 pl-9 mt-72 w-full bg-slate-900 max-md:px-5 max-md:mt-10 max-md:max-w-full">
        <div
          className="self-center text-3xl tracking-tighter text-center text-white leading-[86px] max-md:max-w-full"
        >
          Seamless Experience: Our Platform Now Also Accessible via Mobile App
        </div>
        <div
          className="z-10 mt-20 -mb-4 w-full max-w-[1498px] max-md:mt-10 max-md:mb-2.5 max-md:max-w-full"
          space={142}
        >
          <div className="flex gap-5 max-md:flex-col max-md:">
            <div
              className="w-[65%] max-md:ml-0 max-md:w-full"
            >
              <div className="flex flex-col items-start self-stretch my-auto max-md:mt-10 max-md:max-w-full">
                <div className="flex z-10 flex-col self-stretch pl-5 w-full max-md:max-w-full">
                  <div className="flex flex-wrap gap-3.5">
                    <div className="my-auto">
                      {/* <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a39aa70844f377d8877c85e557b86f96dfb96900?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                        className="object-contain aspect-[1.02] w-[61px]"
                      />
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6232b12c7b72a4a29282e2e00f5696e6eafa5b77?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                        className="object-contain mt-8 aspect-[1.02] w-[61px]"
                      />
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/68e65d213653dede69c85cd5a84748327c655ba9?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                        className="object-contain mt-7 aspect-[1.02] w-[61px]"
                      /> */}
                    </div>
                    <div
                      className="flex-auto text-3xl tracking-tighter text-white leading-[86px] w-[781px] max-md:max-w-full"
                    >
>>>>>>> 2451d11b694fa0d45aba5bc8549f6dc16ea29e61
                      Search and manage deals through your private interface.
                      <br />
                      Request a meeting to discuss deals with projects.
                      <br />
                      Manage your investments and grow your portfolio.
                    </p>
                  </div>
                </div>
<<<<<<< HEAD
                <h4 className="mt-3">Download the app</h4>
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/34f41d287b76cd6ddf44a546860a7cac4325cee0?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                  alt="App Store"
                  className="img-fluid"
                  style={{ width: "200px" }}
                />
                <p className="fs-6">Available on Android and iOS.</p>
              </div>
            </Col>
            <Col md={5} className="mb-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a93abb4711467a15340e6046acdd9b712df4c797?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                alt="Mobile App"
                className="img-fluid rounded-3" style={{width:"65%"}}
              />
            </Col>
          </Row>
        </Container>
=======
                {/* <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/34f41d287b76cd6ddf44a546860a7cac4325cee0?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                  className="object-contain -mt-1 max-w-full aspect-[7.63] w-[343px]"
                /> */}
                <div
                  className="ml-10 text-xl tracking-tighter text-white leading-[86px] max-md:ml-2.5"
                >
                  Available on Android and iOS.
                </div>
              </div>
            </div>
            <div
              className="ml-5 w-[35%] max-md:ml-0 max-md:w-full"
            >
              {/* <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a93abb4711467a15340e6046acdd9b712df4c797?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                className="object-contain grow w-full rounded-3xl aspect-[0.63] max-md:mt-10 max-md:max-w-full"
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex gap-2.5 items-center self-end px-5 py-4 mt-44 mr-9 min-h-[62px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-[62px] max-md:mt-10 max-md:mr-2.5"
      >
        {/* <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2eea0565481af2cb1df24eb0e680dcde96c1516?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
          className="object-contain self-stretch my-auto aspect-[0.87] w-[26px]"
        /> */}
      </div>
      <div
        className="px-20 py-14 mt-16 w-full bg-blue-900 max-md:px-5 max-md:mt-10 max-md:max-w-full"
        space={125}
      >
        <div className="flex gap-5 max-md:flex-col max-md:">
          <div className="w-[21%] max-md:ml-0 max-md:w-full">
            <div className="text-3xl font-light text-white whitespace-nowrap max-md:mt-10">
              {/* <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6497a9607e924869e5c05d9db19cf462ca305ce6?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                className="object-contain aspect-[3.15] w-[300px]"
              /> */}
              <div className="flex flex-col items-center px-16 mt-12 w-full max-md:px-5 max-md:mt-10">
                <div
                  className="text-4xl font-semibold text-center"
                >
                  Navigation
                </div>
                {/* <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc8278037484f7488908c2784555bd185a9d9dd4?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                  className="object-contain mt-2.5 max-w-full aspect-[71.43] w-[147px]"
                /> */}
                <div
                  className="mt-14 text-center max-md:mt-10"
                >
                  Home
                </div>
                <div className="flex gap-4 mt-8 max-w-full text-center w-[105px]">
                  <div>Invest</div>
                  {/* <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdf5fe0fa70003f5860d20f6671c7f029b099d5e?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                    className="object-contain shrink-0 my-auto aspect-[1.8] w-[18px]"
                  /> */}
                </div>
                <div className="flex gap-6 self-end mt-8 text-center">
                  <div className="basis-auto">
                    Fundraise
                  </div>
                  {/* <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdf5fe0fa70003f5860d20f6671c7f029b099d5e?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                    className="object-contain shrink-0 self-start mt-3 aspect-[1.8] w-[18px]"
                  /> */}
                </div>
                <div className="mt-8">
                  Blogs
                </div>
                <div className="mt-6 text-center">
                  About-Us
                </div>
                <div className="mt-8 text-center">
                  Contact-Us
                </div>
              </div>
            </div>
          </div>
          <div
            className="ml-5 w-[79%] max-md:ml-0 max-md:w-full"
          >
            <div className="flex flex-wrap grow gap-5 justify-between items-start mt-36 max-md:mt-10 max-md:max-w-full">
              {/* <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5229e2e7be26a786a2e1c5313244989bc3bd239?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                className="object-contain shrink-0 mt-3.5 w-0.5 aspect-[0]"
              /> */}
              <div className="flex flex-col items-center text-center max-md:max-w-full">
                <div
                  className="text-4xl font-semibold text-white"
                >
                  Our Newsletter
                </div>
                {/* <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6dc9414155ae63de77d095f9b718c36cc7d95bfa?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                  className="object-contain mt-4 max-w-full aspect-[83.33] w-[172px]"
                /> */}
                <div
                  className="mt-16 text-4xl font-semibold text-white max-md:mt-10 max-md:max-w-full"
                >
                  Subscribe to our newsletter
                </div>
                <div
                  className="mt-5 text-xl font-light text-white"
                >
                  Don't miss out! Be the first to know about exciting new
                  developments.
                </div>
                <div className="flex flex-wrap gap-4 self-stretch mt-7">
                  <div
                    className="grow shrink-0 px-16 py-5 text-3xl font-light text-black bg-white border border-white border-solid basis-0 rounded-[35px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] w-fit max-md:px-5 max-md:max-w-full"
                  >
                    Enter your email address...
                  </div>
                  <div
                    className="px-4 py-6 text-3xl text-black whitespace-nowrap bg-blue-100 border border-white border-solid rounded-[35px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
                  >
                    Submit
                  </div>
                </div>
              </div>
              {/* <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f131180d8b8b96c1a9c0f539bb563e2306ff02b1?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                className="object-contain shrink-0 mt-3.5 w-0.5 aspect-[0]"
              /> */}
              <div>
                <div className="flex flex-col items-start pr-12 pl-4 text-3xl font-light text-center text-white max-md:pr-5">
                  <div
                    className="text-4xl font-semibold"
                  >
                    Important Links
                  </div>
                  {/* <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6dc9414155ae63de77d095f9b718c36cc7d95bfa?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                    className="object-contain self-center mt-2.5 max-w-full aspect-[83.33] w-[172px]"
                  /> */}
                  <div
                    className="mt-14 ml-12 max-md:mt-10 max-md:ml-2.5"
                  >
                    FAQs
                  </div>
                  <div className="self-center mt-7">
                    Privacy Policy
                  </div>
                  <div className="mt-7 ml-11 max-md:ml-2.5">
                    Support
                  </div>
                </div>
                <div className="flex gap-3 items-start mt-24 max-md:mt-10">
                  {/* <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5af065c5520ae218cda23d2494f00a15430cab52?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                    className="object-contain shrink-0 aspect-[1.02] w-[51px]"
                  />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/974c3c3e7f16f24929b6e8d24ef8dd072fe0e2ec?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                    className="object-contain shrink-0 aspect-square w-[50px]"
                  />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/76333511bb5bb69d2acf99a1f8e3bb83d721eb40?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                    className="object-contain shrink-0 aspect-square w-[50px]"
                  />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9920bdb6c892f438fe0415b5d5a29a3b395cafba?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                    className="object-contain shrink-0 aspect-square w-[50px]"
                  />
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ed0b013dd8bcdf2dc854fc2ec5ec7ce0f861456?placeholderIfAbsent=true&apiKey=434533fb4921439f899ea5ef72b0fd97"
                    className="object-contain shrink-0 aspect-square w-[50px]"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="px-16 py-4 w-full text-3xl text-center text-black bg-blue-100 max-md:px-5 max-md:max-w-full"
      >
        Copyright © 2024 Designed by IDEA.
>>>>>>> 2451d11b694fa0d45aba5bc8549f6dc16ea29e61
      </div>

      

      
    </div>
  );
}

export default Invest;

// Custom CSS for additional styling
<style jsx>{`
  .bg-gradient {
    background: linear-gradient(90deg, #1e3a8a 0%, #3b82f6 100%);
  }
  .navbar-light .navbar-nav .nav-link {
    color: #000;
    font-weight: 500;
  }
  .navbar-light .navbar-nav .nav-link:hover {
    color: #3b82f6;
  }
  h1.display-4 {
    font-size: 3.5rem;
    line-height: 1.2;
  }
  .card {
    transition: transform 0.3s;
  }
  .card:hover {
    transform: translateY(-5px);
  }
  .rounded-5 {
    border-radius: 50px !important;
  }
`}</style>
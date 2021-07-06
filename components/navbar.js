import React, {
  Component,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Header from "../components/header";
import { Container, Row, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { HamburgerArrowReverse } from "react-animated-burgers";

function navbar() {
  const locale = "en";
  const [today, setDate] = React.useState(new Date());
  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: "long",
  })}\n\n`;
  const hour = today.getHours();
  const wish = `Good ${
    (hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
  }, `;
  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
  });
  const [isActive, setIsActive] = useState(false);

  const toggleButton = useCallback(
    () => setIsActive((prevState) => !prevState),
    []
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <>
      <Container fluid className="divNavbar">
        <Row className="align-items-center">
          <Col lg={12}>
            <div className = "divHamburger">
            <HamburgerArrowReverse
              buttonColor="white"
              barColor="#05133A"
              buttonWidth={28}
              {...{ isActive, toggleButton }}
            />
            </div>
            <div className="divTime">
              <p>{date}</p>
            </div>
            <DropdownButton id="dropdown-basic-button" title="Jason Brumback">
              <Dropdown.Item href="#/action-1">My profile</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Support</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
            </DropdownButton>
            <Image
              fluid
              src="Image/profile.jpg"
              alt="Resurface Logo"
              width={35}
              id="imgProfile"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default navbar;

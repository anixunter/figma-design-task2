import React, { useState, useMemo, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { DiReact, DiHtml5, DiPython, DiJava } from "react-icons/di";
import { FaArrowRight, FaPlus } from "react-icons/fa";
import "./App.css";

const secondary500 = "#C33241";
const container500 = "#F9EBEC";

const COURSES_DATA = [
  {
    index: 0,
    title: "All Courses",
    count: 23,
    description: "courses you're powering\nthrough right now.",
  },
  {
    index: 1,
    title: "Upcoming Courses",
    count: 11,
    description: "exciting new courses\nwaiting to boost your skills.",
  },
  {
    index: 2,
    title: "Ongoing Courses",
    count: 12,
    description: "currently happening - don't\nmiss out on the action!",
  },
];

const IconSet = memo(() => (
  <>
    <DiReact
      style={{ fontSize: "140px", rotate: "16.67deg" }}
      aria-label="React"
    />
    <DiHtml5
      style={{ fontSize: "140px", rotate: "7.22deg" }}
      aria-label="HTML5"
    />
    <DiPython
      style={{ fontSize: "140px", rotate: "-8.9deg" }}
      aria-label="Python"
    />
    <DiJava
      style={{ fontSize: "140px", rotate: "12.61deg" }}
      aria-label="Java"
    />
  </>
));

const TRANSITION_SPRING = { type: "spring", duration: 0.7, bounce: 0.4 };
const TRANSITION_TWEEN = { type: "tween", duration: 0.5 };

const containerStyle = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "32px",
  cursor: "pointer",
  background: secondary500,
  display: "flex",
  flexDirection: "column",
  height: "461px",
  padding: "40px",
};

const CourseCard = memo(
  ({ index, title, count, description, activeIndex, prevIndex, onClick }) => {
    const shouldReduceMotion = useReducedMotion();
    const isActive = activeIndex == index;
    const minWidth = isActive ? "400px" : "200px";
    const inactiveTranslate = activeIndex - prevIndex < 0 ? "-200%" : "200%";

    const dynamicStyles = useMemo(
      () => ({
        minWidth,
        flexGrow: isActive ? 5 : 2,
      }),
      [isActive, minWidth]
    );

    return (
      <motion.div
        style={containerStyle}
        onClick={onClick}
        animate={dynamicStyles}
        transition={TRANSITION_SPRING}
        role="button"
        tabIndex={0}
        aria-label={`Course category: ${title}`}
        onKeyDown={(e) => e.key === "Enter" && onClick()}
      >
        <motion.div
          style={{
            position: "absolute",
            bottom: "-60%",
            left: "-60%",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: container500,
            transform: "translate(-50%, -50%)",
          }}
          animate={{ scale: isActive ? 0 : 3.5 }}
          transition={TRANSITION_TWEEN}
        />

        <div
          style={{
            color: "#fff",
            display: "flex",
            direction: "row",
            gap: "12px",
            marginBottom: "40px",
            fontFamily: "outfit",
            justifyContent: "center",
            marginLeft: "auto",
          }}
          className="parent"
        >
          <div>View all Courses</div>{" "}
          <FaArrowRight
            className="icon"
            style={{ fontWeight: 200 }}
            size={17}
            color="white"
          />
        </div>

        <motion.div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            display: isActive || prevIndex == index ? "flex" : "none",
            gap: "24px",
            color: "#fff",
            lineHeight: 1,
          }}
          animate={{ translateX: isActive ? 0 : inactiveTranslate }}
          transition={TRANSITION_TWEEN}
        >
          <IconSet />
        </motion.div>

        <AnimatedText
          isActive={isActive}
          count={count}
          title={title}
          description={description}
          shouldReduceMotion={shouldReduceMotion}
        />
      </motion.div>
    );
  }
);

const AnimatedText = memo(
  ({ isActive, count, title, description, shouldReduceMotion }) => {
    const textAnimation = shouldReduceMotion
      ? {}
      : {
          rotate: isActive ? 0 : -90,
          y: isActive ? 0 : -60,
          x: isActive ? 0 : -60,
          color: isActive ? "#fff" : secondary500,
          paddingLeft: isActive ? 0 : "78px",
          width: isActive ? "100%" : "24rem",
        };

    return (
      // <div
      //   style={{
      //     display: "flex",
      //     gap: "24px",
      //     height: "100%",
      //     marginTop: "auto",
      //   }}
      // >
      <motion.div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bottom: 0,
          gap: "48px",
          padding: "16px",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            fontSize: "156px",
            fontWeight: 700,
            fontFamily: "Zilla Slab",
            lineHeight: 1,
          }}
          animate={{ color: isActive ? "#fff" : secondary500 }}
          transition={TRANSITION_TWEEN}
        >
          {count}
          <FaPlus
            size={32}
            color={{ color: isActive ? "#fff" : secondary500 }}
          />
        </motion.div>

        <motion.div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            fontFamily: "outfit",
            color: "#fff",
            transformOrigin: "bottom left",
          }}
          animate={textAnimation}
          transition={TRANSITION_TWEEN}
        >
          <div
            style={{ fontSize: "32px", fontWeight: 700, lineHeight: "38.2px" }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: "21.6px",
              whiteSpace: "pre-line",
            }}
          >
            {description}
          </div>
        </motion.div>
      </motion.div>
      // </div>
    );
  }
);

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);

  return (
    <div
      style={{ padding: "40px", background: "#ffffff", minHeight: "100vh" }}
      className="app-container"
    >
      <header>
        <p
          style={{
            fontSize: "24px",
            fontFamily: "outfit",
            fontWeight: 400,
            marginBottom: "16px",
          }}
        >
          Explore our classes and master trending skills!
        </p>
        <h1
          style={{
            fontSize: "32px",
            fontFamily: "outfit",
            fontWeight: 700,
            marginBottom: "16px",
            lineHeight: "38.4px",
            color: "",
          }}
        >
          Dive Into{" "}
          <span style={{ color: "#1DA077" }}>What’s Hot Right Now! 🔥</span>
        </h1>
      </header>

      <div style={{ display: "flex", gap: "24px" }}>
        {COURSES_DATA.map((course, index) => (
          <CourseCard
            key={course.title} // Better key than index
            {...course}
            activeIndex={activeIndex}
            prevIndex={prevIndex}
            onClick={() => {
              if (activeIndex != index) {
                setPrevIndex(activeIndex);
                setActiveIndex(index);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

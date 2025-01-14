import Scene from "./scene";
import { Canvas } from "@react-three/fiber";
import { FC, ReactNode, Suspense, useMemo, useState } from "react";
import { Scroll, useRegister } from "jongleur";
import { clips } from "./keyframes";
import { range } from "jongleur";
import { GithubButton, Loader, Code, DocumentationButton } from "./utils";
import ReactSlider from "react-slider";
import DarkToggle from "@components/utils/dark-toggle";
import clsx from "clsx";

function Keyframes() {
  const register = useRegister(clips);

  const [damping, setDamping] = useState(2);

  const Cards = useMemo(
    () => [
      {
        at: 0.5,
        heading: "Welcome to `Jongleur` 🤹",
        content: (
          <>
            <p>
              This demo shows off some of the features from the library! Check
              out the documentation for usage examples and in depth explanations
              of the api. You can also check out the github to see the full
              source-code of the library and this website:
            </p>
            <div className="flex items-center space-x-2">
              <DocumentationButton />
              <GithubButton />
            </div>
            <p>
              This demo uses <Code>Scroll.Snaps</Code> to snap to scroll
              positions. These pages are indicated by the markers on the left
              hand side.
            </p>
          </>
        ),
      },
      {
        at: 1.5,
        key: "second" as const,
        heading: (
          <>
            This library helps to{" "}
            <span className="italic contents">juggle</span> the difficulties of
            3d and DOM animations
          </>
        ),
        content: (
          <>
            <p>
              Using a keyframe inspired notation, you can orchestrate complex
              scene animations that work with <Code>three.js</Code> objects and
              DOM Elements. The resulting clips can be applied and advanced by
              any form of progress, such as scroll or time.
            </p>
            <p>
              So far, you already saw these effects applied to this card and the
              "Start by scrolling" label on the first page.
            </p>
            <p>
              The real power of the library is combining this with animations in
              a 3d scene. You probably already noticed the empty room, hopefully
              it wont be this empty on the next page...
            </p>
          </>
        ),
      },
      {
        at: 2.5,
        key: "third" as const,
        heading: "There, that's ✨ better ✨",
        content: (
          <>
            <p>
              Per default, a damping effect is applied to the scroll progress,
              which ensures that the animation remains smooth even when the
              scroll jumps around. As this is just a prop to the{" "}
              <Code>Scroll.Controls</Code> Component, we can even change that
              based on user input. Here try for yourself:
            </p>
            <div className="dark:bg-slate-100 dark:text-slate-800 text-sm font-medium py-0.5 px-4 w-fit rounded-full bg-slate-700 text-slate-300">
              Damping: {damping}
            </div>
            <div>
              <ReactSlider
                min={0.1}
                max={10}
                step={0.1}
                value={damping}
                className={"h-4 mt-2 w-full cursor-grab"}
                trackClassName={"h-2 bg-slate-200 dark:bg-slate-700 rounded-md"}
                thumbClassName={
                  "rounded-full h-4 w-4 bg-slate-700 dark:bg-slate-200 -translate-x-1/2 -top-1 focus:outline-none"
                }
                onChange={(value) => setDamping(value)}
              />
            </div>
            <p className={"text-slate-600 dark:text-slate-300 text-sm"}>
              Note: 0.1 is extremely slow 🐌 and 10 is snappy 🚀
            </p>
            <p>
              You can even disable damping for any object or even any single
              animation in the scene.
            </p>
            <p>
              At least now the room is not that empty anymore, but{" "}
              <span className={"contents italic"}>wait</span> there is more that
              we can do...
            </p>
          </>
        ),
      },
      {
        at: 3.5,
        key: "fourth" as const,
        heading: "Did you see the chair? 😮",
        content: (
          <>
            <p>
              Animations can also modify multiple fields simultaneously and
              interleaved, such as the position, rotation and scale of a{" "}
              <Code>three.js</Code> object.
            </p>
            <p className={"text-slate-600 dark:text-slate-300 text-sm"}>
              Hint: If that happened a bit to fast, try to go back and adjust
              the `damping` to a smaller value.
            </p>
          </>
        ),
      },
      {
        at: 4.5,
        key: "fifth" as const,
        heading: "Animating lights and other object",
        content: (
          <>
            <p>
              The library provides a set of default fields to be animated. These
              include common fields for DOM Elements and three.js elements like{" "}
              <Code>Object3D</Code>, <Code>Camera</Code>, <Code>Light</Code> and
              their descendants.
            </p>
            <p>
              Additionally, its extremely easy to add your own fields to work
              with your custom classes and objects. The possibilities are
              endless...
            </p>
          </>
        ),
      },
      {
        at: 6,
        align: "center" as const,
        placement: ["end", "center"] as ["end", "center"],
        heading: "And thats it!",
        content: (
          <>
            <p>
              At least for now... There is a lot more to this library! Check out
              the documentation. If you want to get involved, don't hesitate
              extending upon the library, opening issues or discussions!
            </p>
            <div className="flex justify-center items-center space-x-2">
              <DocumentationButton />
              <GithubButton />
            </div>
          </>
        ),
        className: "mb-8",
      },
    ],
    [setDamping, damping]
  );

  return (
    <Canvas frameloop="demand">
      {/* <Stats /> */}
      <Suspense fallback={<Loader />}>
        <Scroll.Controls orchestrate={clips} damping={damping} horizontal>
          <Scroll.Snaps
            points={[0, 1, 2, 3, 4, 5].map((v) => v + 0.5)}
            align={"center"}
            marker={(_, i) => (
              <div className={"flex flex-col space-y-2 ml-4"}>
                {range(0, i + 1).map((_, i) => (
                  <div className={"w-3 h-3 bg-current rounded-xl"} key={i} />
                ))}
              </div>
            )}
          />
          <Scroll.Html>
            {Cards.map(
              ({ at, heading, content, align, placement, className, key }) => {
                const pl = placement ?? ["center", "end"];
                return (
                  <Scroll.At at={at} align={align ?? "end"} placement={pl}>
                    <div
                      ref={key !== undefined ? register(key) : undefined}
                      className={clsx(
                        "block p-8 min-w-[400px] rounded-lg border border-slate-300 dark:border-slate-700 shadow-md glass",
                        pl[1] === "end" && "mr-8",
                        className
                      )}
                    >
                      <div className="flex flex-col space-y-2">
                        <h2 className="text-2xl font-bold">{heading}</h2>
                        {content}
                      </div>
                    </div>
                  </Scroll.At>
                );
              }
            )}
            <Scroll.At at={1} align={"center"} placement={["end", "center"]}>
              <div
                className={"flex flex-col items-center mb-2 gap-[4px]"}
                ref={register("start")}
              >
                <p>Start by scrolling</p>
                <svg
                  className="w-6 h-6 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </Scroll.At>
          </Scroll.Html>
          <Scroll.Html fixed>
            <Scroll.At at={0} align={"start"} placement={["start", "start"]}>
              <div
                className={
                  "mt-4 ml-4 bg-slate-200 dark:bg-slate-800 rounded-lg p-2 shadow-md"
                }
              >
                <DarkToggle />
              </div>
            </Scroll.At>
          </Scroll.Html>
          <Scene />
        </Scroll.Controls>
      </Suspense>
    </Canvas>
  );
}
export default Keyframes;

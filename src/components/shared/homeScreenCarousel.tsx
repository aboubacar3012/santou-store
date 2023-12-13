import { Carousel } from "@material-tailwind/react";
 
const HomeScreenCarousel = () => {
  return (
    <div className="p-2">
    <Carousel
      className="rounded-xl"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <img
        src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=3433&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="image 1"
        className="h-64 w-full object-cover"
      />
      <img
        src="https://plus.unsplash.com/premium_photo-1695297515622-d0991a12efe3?q=80&w=3370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="image 2"
        className="h-64 w-full object-cover"
      />
      <img
        src="https://plus.unsplash.com/premium_photo-1695297516698-fd7a320a55e5?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="image 3"
        className="h-64 w-full object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="image 4"
        className="h-64 w-full object-cover"
      />

    </Carousel>
    </div>
  );
}

export default HomeScreenCarousel;
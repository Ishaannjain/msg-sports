import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  CardFooter,
  Button,
  Navbar,
  Avatar,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { checkAuth, getLoginInfo } from "../../common/common";
import { BASE_URL } from "../../constants/constant";

const cardData = [
  {
    img: "https://media.istockphoto.com/id/654106838/photo/man-playing-badminton.jpg?s=612x612&w=0&k=20&c=MIwbniPBbxUz0ic-jdka9DmL0oCTtBC1YqVYf_LxDRA=",
    title: "Men's Badminton (Singles)",
    status: "completed",
    link: "#",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0UVvUrRDfvF_Ctg7aGWfEL8gyS-C9VeOZ1Q&s",
    title: "Women's Badminton (Singles)",
    status: "completed",
    link: "#",
  },
  {
    img: "https://live.staticflickr.com/5519/18644080349_aced49218e_b.jpg",
    title: "Men's Carrom (Singles)",
    status: "completed",
    link: "#",
  },
  {
    img: "https://thebridge.in/wp-content/uploads/2018/04/manika-batra.jpg",
    title: "Women's Table Tennis (Singles)",
    status: "ongoing",
    link: "#",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXymKDSwiKfFCWHkqlM7kr1yzvFKRacG1C3w&s",
    title: "Women's Volleyball",
    status: "ongoing",
    link: "#",
  },
  {
    img: "https://images.pexels.com/photos/9003001/pexels-photo-9003001.jpeg",
    title: "Men's Foosball",
    status: "ongoing",
    link: "#",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROkR_gzSPdIi8Q5J7YrsyNGjjDxMEyh9cSYA&s",
    title: "Chess",
    status: "not started",
    link: "#",
  },
  {
    img: "https://i.timesnowhindi.com/stories/Badminton_Mens_Doubles_Final.jpg",
    title: "Men's Badminton (Doubles)",
    status: "not started",
    link: "#",
  },
  {
    img: "https://thefederal.com/h-upload/2023/08/26/412975-india-women-ibsa-world-games-2023.webp",
    title: "Women's Cricket",
    status: "not started",
    link: "#",
  },
];

const Fixtures = [
  {
    team1_id: "Manish",
    team2_id: "Mahesh",
    winner: "Mahesh",
    round_no: 1,
    event_id: "Men's Badminton (Singles)",
  },
  {
    team1_id: "Ishita",
    team2_id: "Ishaan",
    winner: "Ishaan",
    round_no: 1,
    event_id: "Men's Carrom (Singles)",
  },
  {
    team1_id: "Rio",
    team2_id: "Ace",
    winner: "Rio",
    round_no: 1,
    event_id: "Women's Badminton (Singles)",
  },
  {
    team1_id: "Sameer",
    team2_id: "Deepak",
    winner: "Deepak",
    round_no: 1,
    event_id: "Women's Badminton (Singles)",
  },
  {
    team1_id: "Trump",
    team2_id: "Biden",
    winner: "Trump",
    round_no: 2,
    event_id: "Women's Badminton (Singles)",
  },
  {
    team1_id: "Modi",
    team2_id: "Rahul",
    winner: "Modi",
    round_no: 1,
    event_id: "Men's Carrom (Singles)",
  },
];

const CardComponent = ({ img, title, link }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [size, setSize] = useState(null);

  const handleOpen = (value) => setSize(value);

  const filteredFixtures = Fixtures.filter(
    (fixture) => fixture.event_id === title
  );

  return (
    <Card className="mt-6 w-96">
      <CardHeader className="relative h-50">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button
          size="sm"
          variant="text"
          className="flex items-center gap-2 bg-black text-white hover:bg-white hover:text-rose-800"
          onClick={() => handleOpen("xxl")}
        >
          Results
        </Button>
      </CardFooter>

      <Dialog open={size === "xxl"} size={size || "md"} handler={handleOpen}>
        <Navbar
          color="transparent"
          className="bg-rose-800 top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4"
          variant="gradient"
        >
          <DialogHeader className="justify-between m-0">
            <div>
              <Typography
                variant="h3"
                className="font-sans font-bold text-white"
              >
                Result: {title}
              </Typography>
            </div>
            <div>
              <IconButton
                variant="text"
                color="white"
                size="md"
                onClick={() => handleOpen(null)}
              >
                <i className="fas fa-times" />
              </IconButton>
            </div>
          </DialogHeader>
        </Navbar>

        <DialogBody>
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3">
            {filteredFixtures.map((fixture, index) => (
              <Card
                key={index}
                color="white"
                className="relative h-36 mt-6 w-72"
              >
                <div className="m-2 h-3">
                  <p className="h-8 font-bold">Round: {fixture.round_no}</p>
                  <p>
                    Team 1:{" "}
                    {fixture.winner === fixture.team1_id ? (
                      <>
                        <span>{fixture.team1_id}</span>{" "}
                        <IconButton
                          variant="text"
                          color="black"
                          size="sm"
                          className="ml-1"
                        >
                          <i className="fas fa-trophy" />
                        </IconButton>
                      </>
                    ) : (
                      <span>{fixture.team1_id}</span>
                    )}
                  </p>
                  <p>
                    Team 2:{" "}
                    {fixture.winner === fixture.team2_id ? (
                      <>
                        <span>{fixture.team2_id}</span>{" "}
                        <IconButton
                          variant="text"
                          color="black"
                          size="sm"
                          className="ml-1"
                        >
                          <i className="fas fa-trophy" />
                        </IconButton>
                      </>
                    ) : (
                      <span>{fixture.team2_id}</span>
                    )}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </DialogBody>
        <DialogFooter></DialogFooter>
      </Dialog>
    </Card>
  );
};

const CardsList = ({ cards }) => (
  <div className="mt-6 flex flex-wrap justify-center gap-6">
    {cards.map((card, index) => (
      <CardComponent
        key={index}
        img={card.img}
        title={card.title}
        link={card.link}
      />
    ))}
  </div>
);

const Results = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (value) => {
    if (value) {
      setSelectedCategory(value);
    } else {
      setSelectedCategory("all");
    }
  };

  const filteredCards = cardData.filter((card) => {
    if (selectedCategory === "all") {
      return true; // Show all cards when "All" is selected
    } else {
      return card.status === selectedCategory; // Filter cards by selected status
    }
  });

  return (
    <div className="mb-4">
      <Navbar className="text-black flex justify-between items-center sticky top-0 left-0 end-0 bg-white bg-opacity-100 mx-auto rounded-none z-50 max-w-full">
        <Link to="/">
          <Typography variant="h3" className="flex text-gray-600">
            <span className="font-serif text-rose-900 font-bold">.</span>msg-
            <span className="text-rose-900"> Sports</span>
          </Typography>
        </Link>

        <div className="flex flex-row gap-5">
          <Select
            label="Select"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <Option value="all">All</Option>
            <Option value="completed">Completed</Option>
            <Option value="ongoing">On-going</Option>
            <Option value="not started">Not Started</Option>
          </Select>
          <Link to="/player">
            {checkAuth("player") ? (
              <div className="flex items-center gap-2">
                <Typography className="text-rose-800" variant="h6">
                  {getLoginInfo("player", "name")}
                </Typography>
                <Avatar
                  src={
                    BASE_URL +
                    "profile_photo/" +
                    (getLoginInfo("player", "profile") || "avatar.png")
                  }
                />
              </div>
            ) : (
              <Button className="animate-bounce bg-rose-800 shadow-black text-white hover:bg-white hover:text-rose-800 hover:shadow-black">
                Login
              </Button>
            )}
          </Link>
        </div>
      </Navbar>
      <CardsList cards={filteredCards} />
    </div>
  );
};

export default Results;

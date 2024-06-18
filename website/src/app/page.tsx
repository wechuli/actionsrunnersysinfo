"use client";
import Image from "next/image";
import { Box, Button, Heading, Popover, Text, Dialog } from "@primer/react";
import Highcarts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const options = {
  chart: {
    type: "spline",
  },
  title: {
    text: "My chart",
  },
  series: [
    {
      data: [1, 2, 1, 4, 3, 6],
    },
  ],
};

export default function Home() {
  return (
    <main>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam a at sunt
        sed voluptas recusandae pariatur sit! Consequatur quibusdam qui fugit
        beatae esse modi, ipsa quasi voluptas magnam excepturi aspernatur. Lorem
        ipsum dolor sit amet, consectetur adipisicing elit. Illum pariatur
        soluta necessitatibus voluptas voluptatem earum eum consectetur
        voluptate. Dicta nam unde eos dolore autem qui, voluptatibus aliquid sed
        deleniti fuga.
      </p>

      <Box position="relative">
        <Box justifyContent="center" display="flex">
          <Button variant="primary">Hello!</Button>
        </Box>

        <Popover relative open={false} caret="top">
          <Popover.Content sx={{ mt: 2 }}>
            <Heading sx={{ fontSize: 2 }}>Popover heading</Heading>
            <Text as="p">Message about this particular piece of UI.</Text>
            <Button>Got it!</Button>
          </Popover.Content>
        </Popover>
      </Box>

      <Button variant="danger">Danger</Button>
      <div>
        <HighchartsReact highcharts={Highcarts} options={options} />
      </div>
    </main>
  );
}

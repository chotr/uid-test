import { Outlet } from "react-router";
import { useRef, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import NLink from "../Component/NLink";

export default function Layout() {
  const refMain = useRef<HTMLDivElement>(null);
  const [navOpen, setNavOpen] = useState(true);

  const toggleNav = () => setNavOpen(!navOpen);

  return (
    <div ref={refMain}>
      <Box>
        <Box maxW="1920px" mx="auto" px={"15px"}>
          <Box
            w={"fit-content"}
            ml={"auto"}
            mb={"-50px"}
            transform={"translate(0, 25px)"}
            style={{ alignItems: "center", gap: "10px" }}
            cursor={"pointer"}
            display={{ base: "flex", xl: "none" }}
            onClick={() => toggleNav()}
          >
            <Box
              w={"40px"}
              h={"40px"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              border={"1px solid rgb(235, 235, 235)"}
              borderRadius={"6px"}
            >
              <HamburgerIcon />
            </Box>{" "}
            Menu
          </Box>
          <Flex gap={"24px"} minHeight={"100vh"} padding={"30px 0"}>
            <Box
              w="100%"
              maxWidth={"340px"}
              backgroundColor={"rgb(244, 244, 244)"}
              borderRadius={"16px"}
              boxShadow={"rgba(0, 0, 0, 0.08) 0px 0px 0px"}
              padding={"30px 20px"}
              flexShrink={'0'}
              position={{ base: "absolute", xl: "relative" }}
              height={{ base: "calc(100vh - 30px)", xl: "auto" }}
              top={{ base: "15px", xl: "unset" }}
              zIndex={"999"}
              transition={"all 0.4s ease-in-out"}
              transform={{
                base: navOpen
                  ? "translate(calc(-100% - 15px), 0)"
                  : "translate(0, 0)",
                xl: "unset",
              }}
            >
              <Box
                w={"40px"}
                h={"40px"}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                display={{ base: "flex", xl: "none" }}
                border={"1px solid rgb(235, 235, 235)"}
                borderRadius={"6px"}
                marginBottom={"20px"}
                ml={"auto"}
                onClick={() => {
                  setNavOpen(true);
                }}
                cursor={"pointer"}
              >
                <CloseIcon />
              </Box>

              <Text fontSize="18px" fontWeight={"500"} mb={"24px"}>
                Products management
              </Text>

              <Flex flexDirection={"column"} gap={"16px"} mb={"24px"}>
                <Box>
                  <NLink link={"/"}>Home</NLink>
                </Box>

                <Box>
                  <NLink link={"/create-product"}>Create Product</NLink>
                </Box>

                <Box>
                  <NLink link={"/products"}>Product List</NLink>
                </Box>
              </Flex>
            </Box>
            <Box flex={1} p={{ base: "0", xl: "10px 0" }}>
              <Outlet></Outlet>
            </Box>
          </Flex>
        </Box>
      </Box>
    </div>
  );
}

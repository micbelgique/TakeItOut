import { Box, Link, useMediaQuery } from "@mui/material";

export default function Footer() {
  const isSmallScreen = useMediaQuery("(max-width:800px)");

  return (
    <footer className="footer">
      {!isSmallScreen && (
        <Box
          sx={{
            mt: "2rem",
            mb: 0.4,
          }}
        >
          Prototype réalisé par le{" "}
          <Link href="https://www.mic-belgique.be/" underline="hover">
            Mic
          </Link>
        </Box>
      )}
    </footer>
  );
}

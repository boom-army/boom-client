export {};
// import { web3 } from "@project-serum/anchor";
// import { useContext } from "react";
// import { Container } from "@mui/material";
// import CheckIcon from "@mui/icons-material/Check";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import CableIcon from "@mui/icons-material/Cable";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import SupportAgentIcon from "@mui/icons-material/SupportAgent";
// import { styled } from "@mui/material/styles";
// import { useConnection } from "@solana/wallet-adapter-react";
// import { currentCluster } from "../utils/utils";
// import {
//   Avatar,
//   Box,
//   Grid,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import Tilt from "react-parallax-tilt";
//
// import { CandyMintHome } from "../components/CandyMachine/CandyMintHome";

// const TiltStyled = styled(Tilt)({
//   backgroundImage: "url(/assets/outer.png)",
//   backgroundSize: "cover",
//   backgroundRepeat: "no-repeat",
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "center",
//   alignItems: "center",
//   width: "210px",
//   height: "210px",
//   transformStyle: "preserve-3d",
// });

// const ThemeListItemText = styled(ListItemText)((props) => ({
//   "& p": {
//     color: props.theme.palette.secondary,
//   },
// }));

// const getCandyMachineId = (): web3.PublicKey | undefined => {
//   try {
//     const candyMachineId = new web3.PublicKey(
//       import.meta.env.VITE_CANDY_MACHINE_ID!
//     );

//     return candyMachineId;
//   } catch (e) {
//     console.log("Failed to construct CandyMachineId", e);
//     return undefined;
//   }
// };

// const cluster = currentCluster();
// const rpcHost = cluster?.endpoint;
// const network = cluster?.name;
// const txTimeout: number = 30000;
// const candyMachineId = getCandyMachineId();

// export const OGMint = () => {
//   const theme = useTheme();
//   const { connection } = useConnection();

//   return (
//     <Container sx={{ marginTop: 20 }}>
//       <Box
//         mb={2}
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <img
//           src={"/assets/Boom Heros Season Challenge Mint.png"}
//           alt="Boom OG NFT Mint"
//           width="100%"
//         />
//       </Box>
//       <Grid container mb={2}>
//         <Grid item sm={8} xs={12}>
//           <Box>
//             <CandyMintHome
//               connection={connection}
//               rpcHost={rpcHost}
//               txTimeout={txTimeout}
//               network={network}
//               candyMachineId={candyMachineId}
//             />
//           </Box>
//         </Grid>
//         <Grid item sm={4}>
//           <Box sx={{ display: { xs: "none", sm: "block" } }}>
//             <TiltStyled
//               className="track-on-window"
//               tiltMaxAngleX={30}
//               tiltMaxAngleY={30}
//               perspective={800}
//               transitionSpeed={1500}
//               trackOnWindow={true}
//             >
//               <Box
//                 sx={{
//                   justifyContent: "center",
//                   alignItems: "center",
//                   transform: "translateZ(30px)",
//                   display: "flex",
//                 }}
//               >
//                 <img
//                   src={"/assets/animated-200.gif"}
//                   width="140"
//                   className="inner-element"
//                   alt="Boom Heroes #420"
//                 />
//               </Box>
//             </TiltStyled>
//           </Box>
//         </Grid>
//       </Grid>
//       <Box>
//         <Typography>
//           You're about to mint a #BoomHeroes NFT that will give you immediate
//           access to the Boom Heroes Chat Channel. This is the first NFT secured
//           chat in the world. We're likely going to reduce the supply in the next
//           few days so don't sleep on it.
//         </Typography>
//       </Box>
//       <Box mt={4}>
//         <img
//           src={"/assets/Tips for minting.png"}
//           width="180"
//           alt="Minting Schedule"
//         />
//         <Typography mb={1}>Here's some pro-tips to help you out:</Typography>
//         <List>
//           <ListItem>
//             <ListItemAvatar>
//               <Avatar sx={{ background: theme.accentColor }}>
//                 <CheckIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ThemeListItemText
//               primary="How to connect"
//               secondary="Use the connect button on the top right in the Nav for full access to
//               Boom.Army. You'll have to sign a wallet popup message to verify your Boom.Army account."
//             />
//           </ListItem>
//           <ListItem>
//             <ListItemAvatar>
//               <Avatar sx={{ background: theme.accentColor }}>
//                 <CableIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ThemeListItemText
//               primary="Connecting via the mint interface"
//               secondary="If you use the connect button in the mint interface, you'll get an error popup.
//               Don't worry about it, it's just letting you know you only have access to mint, but not to post on Boom.Army."
//             />
//           </ListItem>
//           <ListItem>
//             <ListItemAvatar>
//               <Avatar sx={{ background: theme.accentColor }}>
//                 <AccountBalanceWalletIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ThemeListItemText
//               primary="Have enough Wallet SOL"
//               secondary="Make sure you have enough SOL to pay for TX and Arweave fees especially if you're minting with a WL token. They should be less than 0.02 SOL."
//             />
//           </ListItem>
//           <ListItem>
//             <ListItemAvatar>
//               <Avatar sx={{ background: theme.accentColor }}>
//                 <TwitterIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ThemeListItemText
//               primary="Show off your Boom Hero"
//               secondary="Once you've minted post your avatar on Boom.Army and Twitter with the #BoomHeroes tag."
//             />
//           </ListItem>
//           <ListItem>
//             <ListItemAvatar>
//               <Avatar sx={{ background: theme.accentColor }}>
//                 <SupportAgentIcon />
//               </Avatar>
//             </ListItemAvatar>
//             <ThemeListItemText
//               primary="If all else fails"
//               secondary="In the world of Mainnet Beta sometimes things don't always go as planned. We'll be in discord at https://discord.gg/RqbcwKphDr if you need us."
//             />
//           </ListItem>
//         </List>
//       </Box>
//       <Box mt={4}>
//         <img
//           src={"/assets/The future of Boom heroes.png"}
//           width="300"
//           alt="Minting Schedule"
//         />
//         <Typography mb={1}>
//           We're constantly delivering value on this platform. This includes our
//           upcoming Season Challenges idea. To keep up with what's going on see
//           our docs.
//         </Typography>
//         <Typography mb={1} sx={{ color: theme.accentColor }}>
//           <a
//             href="https://boom.army/docs/docs/prologue/season-challenges/"
//             target="_blank"
//             rel="noreferrer"
//           >
//             A full breakdown of the Season Challenges plan to date.
//           </a>
//         </Typography>
//         <Typography mb={1}>HAPPY MINTING FRENS!</Typography>
//       </Box>
//     </Container>
//   );
// };

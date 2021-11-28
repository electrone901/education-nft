import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './PageCommunity.css'
import {
  Container,
  StylesProvider,
  Typography,
  Button,
  ImageListItem,
  Grid,
  Box,
} from '@material-ui/core'
import { apiKey } from '../../../APIKEYS'

// import community1 from '../../../images/communities/0.jpeg'
// import PetGallery from '../../home-container/gallery/PetGallery'

function PageCommunity() {
  const { projectId } = useParams()
  const [project, setProject] = useState('')

  useEffect(() => {
    console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀 ~', projectId)

    // sets winnerNum
    // setWinningNumber(Math.ceil(Math.random() * 20))

    const getImage = (ipfsURL) => {
      if (!ipfsURL) return
      ipfsURL = ipfsURL.split('://')
      return 'https://ipfs.io/ipfs/' + ipfsURL[1]
    }

    // const resetGame = () => {
    //   window.location.reload()
    // }

    const getMetadata = async () => {
      let data = await fetch(`https://ipfs.io/ipfs/${projectId}/metadata.json`)
      data = await data.json()

      data.image = await getImage(data.image)
      const info = data.description.split(',')
      data.description = info[0]
      data.category = info[1]
      data.wallet = info[2]

      console.log(
        '🚀 ~ file: PageCommunity.js ~ line 43 ~ getMetadata ~ data',
        data,
      )
      setProject(data)
      // const [petOwner, petCategory] = data.description.split(',')
      // const imageFormated = getImage(data.image)
      // setPetImage(imageFormated)
      // setPetName(data.name)
      // setOwnerName(petOwner)
      // setPetCategory(petCategory)
    }

    if (projectId) {
      getMetadata()
      getImage()
    }
  }, [])

  return (
    <StylesProvider injectFirst>
      <Container
        className="page-community"
        style={{ minHeight: '70vh', paddingBottom: '1rem' }}
      >
        <div>
          {/* Grid  */}
          <Box sx={{ width: '100%' }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                <Typography className="title" color="textPrimary" gutterBottom>
                  {project.name}
                </Typography>
                <ImageListItem
                  style={{ height: '300px', width: '450px', listStyle: 'none' }}
                >
                  <img src={project.image} alt="community" />
                </ImageListItem>
              </Grid>

              <Grid p xs={6} className="grid-rigth-side">
                <div className="page-wallet-address">
                  <Typography color="textPrimary" gutterBottom>
                    <b> WalletAddress:</b>
                    {project.wallet}
                  </Typography>
                  <br />
                  <Button variant="contained" color="primary">
                    Send A Tip
                  </Button>
                  <br />
                  <br />

                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/donate"
                  >
                    Donate NFT
                  </Button>

                  <div className="page-metadata">
                    <Typography variant="body2" color="text.secondary">
                      <b> Description:</b>
                      {project.description}
                    </Typography>
                    <br />

                    <Typography variant="body2" color="text.secondary">
                      <b>Category:</b>
                      {project.category}
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </div>

        <br />
        <br />
        <Typography className="subtitle" color="textPrimary" gutterBottom>
          The West Side Community Garden NFTs
        </Typography>

        {/* <PetGallery /> */}
      </Container>
    </StylesProvider>
  )
}

export default PageCommunity

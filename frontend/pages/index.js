import { css } from '@emotion/react'
import { Box, Button, MobileStepper, Typography } from '@mui/material'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
import { useLayout } from '../hooks/index'
import { useRouter } from 'next/router'

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const topImageStyle = css`
  background: url("/sample.png");
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const topTextStyle = css`
  color: white;
  font-size: 24px;
`

const contentsWrapperStyle = css`
  margin: 24px 0 0;
`

const contentContainerStyle = css`
  /* width: 600px; */
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 200px 1fr;
  @media(max-width: 600px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }
`

const imageStyle = css`
  grid-row: 1 / 3;
  grid-column: 1;
  @media(max-width: 600px) {
    grid-row: 1;
    grid-column: 1;
  }
`

const titleStyle = css`
  padding-left: 16px;
  grid-row: 1;
  grid-column: 2;
  @media(max-width: 600px) {
    padding-left: 0;
    grid-row: 2;
    grid-column: 1;
  }
`

const infoStyle = css`
  padding-left: 16px;
  grid-row: 2;
  grid-column: 2;
  @media(max-width: 600px) {
    padding-left: 0;
    grid-row: 3;
    grid-column: 1;
  }
`

const contactImageStyle = css`
  background: url("/sample.png");
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0 0;
`

const contactTextStyle = css`
  color: white;
  font-size: 24px;
`

const contents = [
  {
    src: '/sample.png',
    title: '事業内容',
    info: '事業内容の説明',
    link: '/business-content',
    linkText: '事業内容はこちら'
  },
  {
    src: '/sample.png',
    title: '会社情報',
    info: '会社情報の説明',
    link: '/companyinfo',
    linkText: '会社情報はこちら'
  },
  {
    src: '/sample.png',
    title: '採用情報',
    info: '採用情報の説明',
    link: '/recruit',
    linkText: '採用情報はこちら'
  }
]

export default function Home() {
  const router = useRouter()
  const layout = useLayout()
  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = contents.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const handleStepChange = (step) => {
    setActiveStep(step);
  }

  return (<>
    {/* トップイメージ */}
    <Box css={topImageStyle}>
      <Typography css={topTextStyle}>トップのテキスト</Typography>
    </Box>

    {/* コンテンツ一覧 */}
    <Box css={contentsWrapperStyle}>

      {/* PCの場合はスライドショー */}
      {layout === 'pc' && (
        <AutoPlaySwipeableViews
          axis="x"
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          children={ContentsMap}
        />
      )}

      {/* スマホの場合は縦にずらっと */}
      {layout === 'sp' && <>{ContentsMap}</>}
    </Box>

    {/* PCの場合のみステッパー */}
    {layout === 'pc' && <Stepper
      maxSteps={maxSteps}
      activeStep={activeStep}
      handleNext={handleNext}
      handleBack={handleBack}
    />}

    {/* お問い合わせへのリンク */}
    <Box css={contactImageStyle}>
      <Typography css={contactTextStyle} onClick={() => router.push('/contact')}>お問合せはこちら</Typography>
    </Box>
  </>)
}

const ContentsMap = contents.map((ele, index) => (
  <Box css={contentContainerStyle} key={index}>
    {/* 画像 */}
    <Box css={imageStyle}>
      <Image
        src={ele.src}
        layout="responsive"
        width={1}
        height={1}
      />
    </Box>
    {/* タイトル */}
    <Typography css={titleStyle}>{ele.title}</Typography>
    {/* インフォ */}
    <Box css={infoStyle}>
      <Typography>{ele.info}</Typography>
      <Link href={ele.link}>{ele.linkText}</Link>
    </Box>
  </Box>
))

const Stepper = ({ maxSteps, activeStep, handleNext, handleBack, }) => {
  return (
    <MobileStepper
      steps={maxSteps}
      position="static"
      activeStep={activeStep}
      nextButton={
        <Button
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps - 1}
        >
          Next
          <KeyboardArrowRight />
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
          <KeyboardArrowLeft />
          Back
        </Button>
      }
    />
  )
}
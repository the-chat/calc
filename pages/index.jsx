import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material"
import { createContext, useContext, useEffect, useState } from "react"

// const rand = (min, max) => Math.random() * (max - min) + min

// const useV = () => {
//   const [v, sv] = useState(0)

//   useEffect(() => {
//     setInterval(() => sv(rand(100, 400)), 1000)
//   }, [])

//   return v
// }

const w = 300

const Context = createContext()

const letters = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "+",
  "-",
  "*",
  "/",
  "**",
  ".",
  "=",
  "C",
  "D",
]

const Display = () => {
  const [expression, setExpression, error, setError] = useContext(Context)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <TextField
        sx={{ width: w }}
        onInput={(ev) => {
          if (!ev.target.value) return setExpression("")

          if (letters.includes(ev.target.value.slice(-1)))
            setExpression(ev.target.value)
        }}
        inputmode="numeric"
        value={expression}
        error={error.trim()}
        placeholder="Введите здесь"
        helperText={error}
      />
    </Box>
  )
}

const CalcButton = ({ letter }) => {
  const [
    expression,
    setExpression,
    error,
    setError,
    shouldDelete,
    setShouldDelete,
  ] = useContext(Context)

  return (
    <Button
      sx={{ width: w / 3 }}
      onClick={() => {
        if (error) setError(" ")

        switch (letter) {
          case "C":
            setExpression((p) => p.slice(0, -1))
            break
          case "D":
            setExpression("")
            break
          case "=":
            setExpression((p) => {
              try {
                if (p) {
                  let result = String(eval(p))
                  if (result != "Infinity") {
                    setShouldDelete(true)
                    return result
                  }

                  setError("Неверное выражение")
                  return p
                }
              } catch {
                setError("Неверное выражение")
                return p
              }
            })
            break
          default:
            setShouldDelete(false)
            setExpression((p) => {
              return (Number(letter) && shouldDelete ? "" : p) + letter
            })
        }
      }}
    >
      {letter}
    </Button>
  )
}

const Comp = () => {
  const [expression, setExpression] = useState("")
  const [error, setError] = useState(" ")
  const [shouldDelete, setShouldDelete] = useState("")
  // const v = useV()

  return (
    <Context.Provider
      value={[
        expression,
        setExpression,
        error,
        setError,
        shouldDelete,
        setShouldDelete,
      ]}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // background: "#999",
        }}
      >
        <Box>
          <Display />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              width: w,
              // background: "#999",
            }}
          >
            {letters.map((letter) => (
              <CalcButton key={letter} letter={letter} />
            ))}
          </Box>
        </Box>
      </Box>
    </Context.Provider>
  )
}

const Page = () => (
  <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
    <CssBaseline />
    <Comp />
  </ThemeProvider>
)

export default Page

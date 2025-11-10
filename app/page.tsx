'use client'

import { useState, useEffect } from 'react'
import styles from './page.module.css'

interface Question {
  left: {
    label: string
    emoji: string
  }
  right: {
    label: string
    emoji: string
  }
}

const questions: Question[] = [
  {
    left: { label: 'Luxury Car', emoji: '🚗' },
    right: { label: 'Baby', emoji: '👶' }
  },
  {
    left: { label: 'Beach Vacation', emoji: '🏖️' },
    right: { label: 'Mountain Adventure', emoji: '⛰️' }
  },
  {
    left: { label: 'Fame', emoji: '⭐' },
    right: { label: 'Privacy', emoji: '🔒' }
  },
  {
    left: { label: 'Big City Life', emoji: '🌆' },
    right: { label: 'Countryside Peace', emoji: '🌾' }
  },
  {
    left: { label: 'Passion', emoji: '❤️' },
    right: { label: 'Stability', emoji: '🏛️' }
  },
  {
    left: { label: 'Adventure', emoji: '🎢' },
    right: { label: 'Comfort', emoji: '🛋️' }
  },
  {
    left: { label: 'Create', emoji: '🎨' },
    right: { label: 'Consume', emoji: '📺' }
  }
]

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null)

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleChoice = (choice: 'left' | 'right') => {
    setSelectedSide(choice)
    const selected = choice === 'left' ? questions[currentQuestion].left.label : questions[currentQuestion].right.label
    setAnswers([...answers, selected])

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedSide(null)
      } else {
        setShowResults(true)
      }
    }, 400)
  }

  const restart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setSelectedSide(null)
  }

  if (showResults) {
    return (
      <div className={styles.container}>
        <div className={styles.results}>
          <h1 className={styles.resultsTitle}>What You Want</h1>
          <p className={styles.resultsSubtitle}>Based on your choices, here's what matters to you:</p>
          <div className={styles.answersList}>
            {answers.map((answer, index) => (
              <div key={index} className={styles.answerItem}>
                <span className={styles.answerNumber}>{index + 1}</span>
                <span className={styles.answerText}>{answer}</span>
              </div>
            ))}
          </div>
          <button onClick={restart} className={styles.restartButton}>
            Take Survey Again
          </button>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>What Do You Want?</h1>
        <p className={styles.subtitle}>discover what you truly desire in life • 45 seconds</p>
        <div className={styles.progressContainer}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
        <p className={styles.questionCount}>
          Question {currentQuestion + 1} of {questions.length} ({Math.round(progress)}%)
        </p>
      </div>

      <div className={styles.choiceContainer}>
        <button
          className={`${styles.choiceButton} ${selectedSide === 'left' ? styles.selected : ''}`}
          onClick={() => handleChoice('left')}
        >
          <div className={styles.emoji}>{question.left.emoji}</div>
          <div className={styles.label}>{question.left.label}</div>
        </button>

        <div className={styles.vs}>VS</div>

        <button
          className={`${styles.choiceButton} ${selectedSide === 'right' ? styles.selected : ''}`}
          onClick={() => handleChoice('right')}
        >
          <div className={styles.emoji}>{question.right.emoji}</div>
          <div className={styles.label}>{question.right.label}</div>
        </button>
      </div>
    </div>
  )
}

#include "pingpong.h"
#include <QDebug>

PingPong::PingPong()

{
    m_timer = new QTimer(this);
}
PingPong::~PingPong()
{
    delete m_timer;
}

void PingPong::checkBoundaries()
{
    float ballWidth = m_boardWidth/54;
    float racketSize = m_boardWidth/27;
    float racketHeight = m_boardHeight/5;
    //! [Checking the boundaries]
    if (((m_ballX + ballWidth) > (m_boardWidth - racketSize)) && ((m_ballY + ballWidth) < (m_rightRacketY + racketHeight))
            && (m_ballY > m_rightRacketY)) {
        m_targetY = 2 * m_ballY - m_ballPreviousY;
        m_targetX = m_ballPreviousX;
        interval = -5;
        updateDirection();
    }
    else if ((m_ballX < racketSize) && ((m_ballY + ballWidth) < (m_leftRacketY + racketHeight))
             && (m_ballY > m_leftRacketY)) {
        m_targetY = 2 * m_ballY - m_ballPreviousY;
        m_targetX = m_ballPreviousX;
        interval = 5;
        updateDirection();
    }
    else if (m_ballY < 0 || (m_ballY + ballWidth > m_boardHeight)) {
        m_targetY = m_ballPreviousY;
        m_targetX = m_ballX + interval;
        updateDirection();
    }
    //! [Checking the boundaries]
    else if ((m_ballX + ballWidth) > m_boardWidth) {
        m_resultLeft++;
        m_targetX = m_boardWidth;
        m_targetY = m_boardHeight/2;
        m_ballPreviousX = m_ballX = m_boardWidth/2;
        m_ballPreviousY = m_ballY = m_boardHeight - m_boardWidth/54;

        updateDirection();
        checkResult();
        QByteArray result;
        result.append("result ");
        QByteArray res;
        res.setNum(m_resultLeft);
        result.append(res);
        result.append(' ');
        res.setNum(m_resultRight);
        result.append(res);
        result.append(" \n");
        qDebug() << result;
    }
    else if (m_ballX < 0) {
        m_resultRight++;
        m_targetX = 0;
        m_targetY = m_boardHeight/2;
        m_ballPreviousX = m_ballX = m_boardWidth/2;
        m_ballPreviousY = m_ballY = m_boardHeight - m_boardWidth/54;
        updateDirection();
        checkResult();
        QByteArray result;
        result.append("result ");
        QByteArray res;
        res.setNum(m_resultLeft);
        result.append(res);
        result.append(' ');
        res.setNum(m_resultRight);
        result.append(res);
        result.append(" \n");
    }
}

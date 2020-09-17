#ifndef PINGPONG_H
#define PINGPONG_H

#include <QTimer>
#include <QObject>

class PingPong: public QObject
{
    Q_OBJECT


public:
    PingPong();
    ~PingPong();
    float ballX() const;
    float ballY() const;
    float leftRacketY() const;
    float rightRacketY() const;
    void checkBoundaries();
    void updateDirection();
    QString message() const;
    void setMessage(const QString &message);
    int role() const;
    int leftResult() const;
    int rightResult() const;
    void checkResult();


private:
    float m_ballX;
    float m_ballY;
    float m_ballPreviousX;
    float m_ballPreviousY;
    float m_leftRacketY;
    float m_rightRacketY;
    QTimer *m_timer;
    float m_boardWidth;
    float m_boardHeight;
    float m_direction;
    float m_targetX;
    float m_targetY;
    int interval;
    int m_resultLeft;
    int m_resultRight;
    QString m_message;
    int m_role;
    float m_proportionX;
    float m_proportionY;


};

#endif // PINGPONG_H

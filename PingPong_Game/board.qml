import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls.Material 2.0

Rectangle{

    visible: true
    width: 640
    height: 480
    color: "#0c3a01"

    Rectangle
    {
        id: boardline
        anchors.horizontalCenter: parent.horizontalCenter
        anchors.verticalCenter: parent.verticalCenter
        height: parent.height/100
        width: parent.width
        color: "#ffffff"
    }
    Rectangle
    {
        id: net
        color: "#000000"
        anchors.horizontalCenter: parent.horizontalCenter
        height: parent.height
        width: parent.width/100
    }


    //Raqueta izquierda
    Rectangle {
        id: leftracket
        y: (parent.height/2)
        width: (parent.width/27)
        height: (parent.height/5)
        anchors.left: parent.left
        color: "#be0505"
        radius: 10
        MouseArea {
            id: leftMouse
            anchors.fill: parent
            acceptedButtons: Qt.LeftButton
            drag.target: leftracket
            drag.axis: Drag.YAxis
            drag.minimumY: 0
            drag.maximumY: (board.height - leftracket.height)
        }
    }


    //Raqueta derecha
    Rectangle {
        id: rightracket
        y: (parent.height/2)
        width: (parent.width/27)
        height: (parent.height/5)
        anchors.right: parent.right
        color: "#041d90"
        radius: 10

        MouseArea
        {
            id: rightMouse
            anchors.fill: parent
            acceptedButtons: Qt.LeftButton
            drag.target: rightracket
            drag.axis: Drag.YAxis
            drag.minimumY: 0
            drag.maximumY: (board.height - rightracket.height)
        }
    }


    //Pelota
    Rectangle {
        id: ball
        width: leftracket.width/2
        height: leftracket.width/2
        radius: width
        color: "#e1f708"
        x: pingPong.ballX
        y: pingPong.ballY

        SequentialAnimation {
            running: true
            NumberAnimation { target: ball; property: "x"; duration: 50 }
            NumberAnimation { target: ball; property: "y"; duration: 50 }
        }
    }
}

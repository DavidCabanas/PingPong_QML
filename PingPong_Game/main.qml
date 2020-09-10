import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls.Material 2.0

Window {
    id: board
    visible: true
    width: 640
    height: 480
    title: qsTr("Ping Pong")


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

}

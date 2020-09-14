import QtQuick 2.12
import QtQuick.Window 2.12
import QtQuick.Controls.Material 2.0
import QtQuick.Controls 2.3

Window {
    visible: true
    width: 640
    height: 480
    title: qsTr("Ping Pong")
    color: "#023d09"

    Loader {
        id: pageLoader
        anchors.fill: parent
    }



    Component.onCompleted: pageLoader.source = "menu.qml"



}

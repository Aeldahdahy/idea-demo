import * as React from "react";
import { StyleSheet, View, Text, Pressable, Image, Dimensions, ScrollView, TouchableOpacity } from "react-native";
import { Color, Border, FontSize, FontFamily } from "../GlobalStyles";

const { width, height } = Dimensions.get('window');

export default function GetStarted4({HeaderText}) {
    const [currentIndex, setCurrentIndex] = React.useState(1); // Start at 1 due to cloned slides
    const scrollViewRef = React.useRef(null);
    const timerRef = React.useRef(null);

    const data = [
        { id: 1, image: require('../assets/image-0.14.png'), text: 'Create your account as an investor and search for startups' },
        { id: 2, image: require('../assets/image-0.12.png'), text: 'Verify Your account to get the right offers' },
        { id: 3, image: require('../assets/image-0.7.png'), text: 'Start searching for the right startup with your industry preferences' },
        { id: 4, image: require('../assets/image-0.13.png'), text: 'Start investing on your chosen startup' },
    ];

    // Extended data with cloned first and last items for infinite loop
    const extendedData = [data[data.length - 1], ...data, data[0]];

    // Auto-scroll function
    const startAutoScroll = () => {
        timerRef.current = setInterval(() => {
            setCurrentIndex(prevIndex => {
                if (prevIndex === extendedData.length - 1) {
                    return 1; // Reset to the first real slide
                }
                return prevIndex + 1;
            });
        }, 10000); // Scroll every 5 seconds
    };

    // Clear auto-scroll timer
    const resetAutoScroll = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        startAutoScroll(); // Restart auto-scroll
    };

    // Effect for handling scroll changes
    React.useEffect(() => {
        // Scroll to the current index
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: width * currentIndex, animated: true });
        }

        // Handle infinite scrolling by jumping to real slides after reaching clones
        if (currentIndex === 0) {
            setTimeout(() => {
                setCurrentIndex(data.length);
                scrollViewRef.current.scrollTo({ x: width * data.length, animated: false });
            }, 300);
        } else if (currentIndex === extendedData.length - 1) {
            setTimeout(() => {
                setCurrentIndex(1);
                scrollViewRef.current.scrollTo({ x: width, animated: false });
            }, 300);
        }
    }, [currentIndex]);

    // Start auto-scroll on component mount
    React.useEffect(() => {
        startAutoScroll();
        return () => clearInterval(timerRef.current); // Clean up timer on unmount
    }, []);

    // Handle manual scroll
    const handleScrollEnd = (event) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const newIndex = Math.round(contentOffsetX / width);
        setCurrentIndex(newIndex);
        resetAutoScroll(); // Reset auto-scroll on manual scroll
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Header}>
                {HeaderText}
            </Text>

            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                onMomentumScrollEnd={handleScrollEnd}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContent}
            >
                {extendedData.map((item, index) => (
                    <View style={styles.slide} key={index}>
                        <Image
                            style={styles.containerImage}
                            resizeMode="contain"
                            source={item.image}
                        />
                        <Text style={styles.containerText}>
                            {item.text}
                        </Text>
                    </View>
                ))}
            </ScrollView>

            {/* Circle Navigator */}
            <View style={styles.pagination}>
                {data.map((_, index) => (
                    <TouchableOpacity key={index} style={[
                        styles.dot,
                        currentIndex === index + 1 ? styles.activeDot : styles.inactiveDot,
                    ]} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.colorWhite,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Header: {
        fontSize: FontSize.size_16xl,
        fontFamily: FontFamily.signikaBold,
        textAlign: "center",
        marginTop: 10,
    },
    containerImage: {
        width: width * 0.8,
        height: height * 0.4,
    },
    scrollViewContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerText: {
        fontSize: FontSize.size_2xl,
        fontWeight: "300",
        fontFamily: FontFamily.signikaLight,
        textAlign: "center",
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    slide: {
        width: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: Color.colorBlack,
    },
    inactiveDot: {
        backgroundColor: Color.colorGray_Black_300,
    },
});

import streamlit as st
import pandas as pd
import plotly.express as px
import numpy as np
import google.generativeai as genai

class PollutionDetectionSystem:
    def __init__(self, water_data, api_key):
        self.water_data = water_data
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel('gemini-pro')

    def generate_comprehensive_report(self):
        """
        Generate a comprehensive water quality analysis report using Gemini AI
        
        :return: Text report of water quality analysis with detailed ecosystem impacts
        """
        try:
            # Aggregate data
            total_locations = len(self.water_data)
            summary_stats = {
                location: {
                    'avg_discharge': df['water_discharge'].mean(),
                    'avg_water_level': df['water_level'].mean(),
                    'avg_turbidity': df['turbidity'].mean(),
                    'avg_ph': df['ph_level'].mean(),
                    'avg_dissolved_oxygen': df['dissolved_oxygen'].mean(),
                    'ph_variation': df['ph_level'].std(),
                    'do_variation': df['dissolved_oxygen'].std()
                } for location, df in self.water_data.items()
            }

            # Calculate overall risk indicators
            risk_indicators = {
                location: {
                    'water_quality_risk': self._calculate_water_quality_risk(stats),
                    'ecosystem_stress_index': self._calculate_ecosystem_stress(stats)
                } for location, stats in summary_stats.items()
            }

            # Prepare comprehensive prompt for Gemini
            prompt = f"""Provide an in-depth water quality and ecosystem impact analysis based on the following comprehensive data:

MONITORING OVERVIEW:
- Total Monitored Locations: {total_locations}

LOCATION-WISE DETAILED ANALYSIS:
{summary_stats}

ECOSYSTEM RISK ASSESSMENT:
{risk_indicators}

Comprehensive Report Requirements:
1. Detailed Water Quality Assessment
   - Chemical composition analysis
   - Water parameter variations
   - Potential contamination sources

2. Aquatic Ecosystem Impact Analysis
   - Effects on fish populations
   - Impact on aquatic biodiversity
   - Potential habitat disruption
   - Oxygen level implications
   - pH level consequences

3. Environmental Risk Factors
   - Pollution transmission risks
   - Long-term ecosystem sustainability
   - Potential human health implications

4. Predictive Ecological Modeling
   - Projected ecosystem changes
   - Climate interaction effects

5. Mitigation and Management Strategies
   - Targeted intervention recommendations
   - Ecosystem restoration proposals
   - Water quality improvement techniques

Provide a scientifically rigorous, detailed, and actionable report that highlights critical environmental insights and potential intervention strategies."""

            # Generate comprehensive report using Gemini
            response = self.model.generate_content(prompt)
            return response.text
        
        except Exception as e:
            return f"Error generating comprehensive report: {str(e)}"

    def _calculate_water_quality_risk(self, stats):
        """
        Calculate water quality risk based on parameter variations
        
        :param stats: Dictionary of water quality statistics
        :return: Risk score (0-100)
        """
        risk_factors = [
            stats['avg_turbidity'] / 100 * 30,  # Turbidity impact
            abs(stats['avg_ph'] - 7) * 10,  # pH deviation impact
            (15 - stats['avg_dissolved_oxygen']) * 5 if stats['avg_dissolved_oxygen'] < 8 else 0  # Oxygen deficit
        ]
        return min(sum(risk_factors), 100)

    def _calculate_ecosystem_stress(self, stats):
        """
        Calculate ecosystem stress index
        
        :param stats: Dictionary of water quality statistics
        :return: Stress index (0-100)
        """
        stress_indicators = [
            stats['ph_variation'] * 10,  # pH instability
            stats['do_variation'] * 5,   # Dissolved oxygen fluctuation
            stats['avg_turbidity'] / 2   # Turbidity impact
        ]
        return min(sum(stress_indicators), 100)

class PollutionDetectionFrontend:
    def __init__(self):
        # Note: Replace with secure API key management in production
        self.GEMINI_API_KEY = "AIzaSyD9NDUbjOJMIRwl0r01iJUt0TULSZb4U9k"  # Replace with actual API key

        # Synthetic water quality data
        self.water_data = self.generate_synthetic_water_data()
        self.pollution_system = PollutionDetectionSystem(self.water_data, self.GEMINI_API_KEY)

    def generate_synthetic_water_data(self):
        """
        Generate synthetic water quality data for demonstration
        
        :return: Dictionary of DataFrames with water quality data
        """
        water_data = {}
        
        locations = ['Rudraprayag', 'Devprayag', 'Bijnor', 'Kannauj', 'Kanpur']
        
        for location in locations:
            # Create synthetic data
            np.random.seed(locations.index(location))
            data = {
                'timestamp': pd.date_range(start='2023-01-01', end='2023-12-31', freq='D'),
                'water_discharge': np.random.uniform(50, 200, 365),
                'water_level': np.random.uniform(2, 10, 365),
                'turbidity': np.random.uniform(0, 100, 365),
                'ph_level': np.random.uniform(6.5, 8.5, 365),
                'dissolved_oxygen': np.random.uniform(5, 15, 365)
            }
            water_data[location] = pd.DataFrame(data)
        
        return water_data

    def render_sidebar(self):
        """
        Render the sidebar with configuration options
        """
        st.sidebar.title("💧 Water Quality Dashboard")
        st.sidebar.markdown("### System Configuration")
        
        st.sidebar.markdown("### Monitored Regions")
        st.sidebar.markdown("""
        **Locations:**
        - Rudraprayag
        - Devprayag
        - Bijnor
        - Kannauj
        - Kanpur
        """)

    def render_overview_metrics(self):
        """
        Render overview metrics for water quality
        """
        st.header("🌊 Water Quality Overview")
        
        cols = st.columns(3)
        
        with cols[0]:
            st.metric(
                label="Total Monitored Locations", 
                value=len(self.water_data),
                help="Number of locations with water quality data"
            )
        
        with cols[1]:
            total_records = sum(len(df) for df in self.water_data.values())
            st.metric(
                label="Total Data Points", 
                value=total_records,
                help="Total number of water quality measurements"
            )
        
        with cols[2]:
            avg_discharge = sum(df['water_discharge'].mean() for df in self.water_data.values()) / len(self.water_data)
            st.metric(
                label="Avg Water Discharge", 
                value=f"{avg_discharge:.2f}",
                help="Average water discharge across monitored locations"
            )

    def render_location_comparison(self):
        """
        Create visualizations comparing water quality across locations
        """
        st.header("📊 Location Comparison")
        
        # Prepare data for comparison
        comparison_data = []
        for location, df in self.water_data.items():
            comparison_data.append({
                'Location': location,
                'Avg Discharge': df['water_discharge'].mean(),
                'Avg Water Level': df['water_level'].mean(),
                'Avg Turbidity': df['turbidity'].mean(),
                'Avg pH': df['ph_level'].mean()
            })
        
        comparison_df = pd.DataFrame(comparison_data)
        
        cols = st.columns(2)
        
        with cols[0]:
            fig = px.bar(
                comparison_df, 
                x='Location', 
                y='Avg Discharge',
                title='Average Water Discharge by Location',
                color='Location'
            )
            st.plotly_chart(fig, use_container_width=True)
        
        with cols[1]:
            fig = px.bar(
                comparison_df, 
                x='Location', 
                y='Avg Turbidity',
                title='Average Water Turbidity by Location',
                color='Location'
            )
            st.plotly_chart(fig, use_container_width=True)

    def render_detailed_analysis(self):
        """
        Render comprehensive analysis report
        """
        st.header("🔬 Comprehensive Water Quality Analysis")
        
        if st.button("Generate Comprehensive Report"):
            with st.spinner('Generating Detailed Environmental Analysis...'):
                report = self.pollution_system.generate_comprehensive_report()
                st.text_area("Comprehensive Ecosystem & Water Quality Report", report, height=500)

    def run(self):
        """
        Main application runner
        """
        self.render_sidebar()
        
        # Main content
        st.title("Water Quality Monitoring & Ecosystem Impact System")
        
        self.render_overview_metrics()
        self.render_location_comparison()
        self.render_detailed_analysis()

def main():
    frontend = PollutionDetectionFrontend()
    frontend.run()

if __name__ == "__main__":
    main()

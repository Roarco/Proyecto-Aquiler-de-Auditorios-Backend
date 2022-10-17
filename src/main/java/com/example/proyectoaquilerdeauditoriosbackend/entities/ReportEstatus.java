package com.example.proyectoaquilerdeauditoriosbackend.entities;

public class ReportEstatus {
    private int completed;
    private int cancelled;

    public ReportEstatus(int completed, int cancelled) {
        this.completed = completed;
        this.cancelled = cancelled;
    }

    public int getCompleted() {
        return completed;
    }

    public void setCompleted(int completed) {
        this.completed = completed;
    }

    public int getCancelled() {
        return cancelled;
    }

    public void setCancelled(int cancelled) {
        this.cancelled = cancelled;
    }

    @Override
    public String toString() {
        return "ReportEstatus{" +
                "completed=" + completed +
                ", cancelled=" + cancelled +
                '}';
    }
}
